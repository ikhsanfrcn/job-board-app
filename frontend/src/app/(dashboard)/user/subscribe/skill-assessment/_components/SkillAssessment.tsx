/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "@/lib/axios";
import { IAssessment } from "@/types/assessment";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Pagination from "@/components/atoms/pagination";
import LoadingSkeleton from "./loadingSkeleton";
import StartModal from "./startModal";

export default function SkillAssessment() {
  const [assessments, setAssessments] = useState<IAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] =
    useState<IAssessment | null>(null);
  const [userAssessmentCount, setUserAssessmentCount] = useState(0);
  const [userSubscriptionType, setUserSubscriptionType] = useState<
    string | null
  >(null);
  const [checkingLimits, setCheckingLimits] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.accessToken;
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const [totalPages, setTotalPages] = useState(1);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", currentPage.toString());
      params.set("size", "5");
      const { data } = await axios.get("/assessment", {
        params: Object.fromEntries(params.entries()),
      });
      setAssessments(data.assessments || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error("Failed to fetch assessments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkIsSubscribe = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await axios.get("/users/is-subscribe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const isValid = data.result.isValid;
      setIsSubscribe(isValid);

      if (!isValid) {
        router.replace("/user/subscribe");
      }
    } catch (err) {
      console.log(err);
    }
  }, [token, router]);

  useEffect(() => {
    fetchAssessments();
    checkIsSubscribe();
  }, [searchParams, token]);

  const handlePageChange = (page: number) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", page.toString());
    router.push(`/user/subscribe/skill-assessment?${query.toString()}`);
  };

  const checkUserLimits = async () => {
    if (checkingLimits) return false;

    try {
      setCheckingLimits(true);
      const subscribe = await axios.get("/subscribers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = subscribe.data;

      const subscriptionType = user.type || null;
      setUserSubscriptionType(subscriptionType);

      if (subscriptionType === "STANDARD") {
        const assessments = await axios.get("/assessment/user-assessment", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const assessmentCount = assessments.data?.userAssessments?.length || 0;

        setUserAssessmentCount(assessmentCount);
        if (assessmentCount >= 2) {
          toast.warning(
            "You have reached your assessment limit (2/2). Please upgrade to Professional Plan for unlimited assessments."
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log("Error checking user limits:", error);
      return true;
    } finally {
      setCheckingLimits(false);
    }
  };

  const handleStartClick = async (assessment: IAssessment) => {
    const canStart = await checkUserLimits();
    if (!canStart) return;

    setSelectedAssessment(assessment);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAssessment(null);
  };

  const handleConfirmStart = () => {
    if (selectedAssessment) {
      router.push(`/assessment/${selectedAssessment.id}`);
    }
    handleModalClose();
  };

  const getButtonText = () => {
    if (userSubscriptionType === "STANDARD") {
      const remaining = Math.max(0, 2 - userAssessmentCount);
      if (remaining === 0) return "Limit Reached";
      return `Start (${remaining} left)`;
    }
    return "Start";
  };

  const isButtonDisabled = () => {
    return (
      checkingLimits ||
      (userSubscriptionType === "STANDARD" && userAssessmentCount >= 2)
    );
  };

  if (!isSubscribe) return null;

  return (
    <div className="w-full p-4">
      <div className="w-full flex flex-col font-sans mb-7">
        {loading ? (
          <LoadingSkeleton />
        ) : assessments.length > 0 ? (
          assessments.map((a, idx) => (
            <div
              key={a.id}
              className="mb-4 p-4 border border-gray-300 rounded flex-row sm:flex items-center justify-between gap-3 shadow-md"
            >
              <div className="flex items-center gap-5">
                <div className="border-b border-gray-300 text-shadow-sm">
                  {(currentPage - 1) * 5 + idx + 1}
                </div>
                <Image
                  src={a.badgeImage}
                  alt={a.title}
                  height={40}
                  width={40}
                />
                <div>
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <p className="text-gray-600">{a.description}</p>
                </div>
              </div>
              <div className="flex justify-end sm:items-center mt-3 sm:mt-0 gap-3">
                <span className="w-20 text-xs text-gray-800 bg-green-200 p-3 rounded-lg text-center mr-3">
                  {a.category}
                </span>
                <button
                  onClick={() => handleStartClick(a)}
                  disabled={isButtonDisabled()}
                  className={`px-3 py-2 rounded-lg transition duration-300 ${
                    isButtonDisabled()
                      ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                      : "text-gray-500 bg-gray-100 hover:text-white hover:bg-green-600"
                  }`}
                >
                  {checkingLimits ? "Checking..." : getButtonText()}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Skill Assessment</p>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <StartModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmStart}
        assessment={selectedAssessment}
      />
    </div>
  );
}
