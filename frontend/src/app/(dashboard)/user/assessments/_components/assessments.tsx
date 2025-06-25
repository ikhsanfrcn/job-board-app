/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { IUserAssessment } from "@/types/assessment";
import { useSession } from "next-auth/react";
import AssessmentsCard from "./assesmentsCard";
import AssessmentSkeleton from "./skeleton";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/atoms/pagination";
import Filter from "./filter";

export default function Assessments() {
  const { data: user } = useSession();
  const token = user?.accessToken;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [assessments, setAssessments] = useState<IUserAssessment[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    if (pageFromUrl !== currentPage) setCurrentPage(pageFromUrl);
  }, [searchParams]);

  const fetchAssessments = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", currentPage.toString());
      params.set("limit", "6");

      const { data } = await axios.get("/assessment/user-assessment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: Object.fromEntries(params.entries()),
      });
      setAssessments(data.assessments);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [token, searchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", page.toString());
    router.push(`/user/assessments?${query.toString()}`);
  };

  const checkIsSubscribe = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await axios.get("/users/is-subscribe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsSubscribe(data.result.isValid);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    fetchAssessments();
    checkIsSubscribe();
  }, [fetchAssessments, checkIsSubscribe]);

  const handleDownloadPdf = async (assessmentId: string) => {
    if (!token) {
      toast.error("You must be logged in to download the certificate.");
      return;
    }

    try {
      const { data } = await axios.get(
        `/assessment/generate-pdf/${assessmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.message || "Failed to download certificate."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full p-4">
      <Filter />
      {loading ? (
        <AssessmentSkeleton />
      ) : (
        <AssessmentsCard
          assessments={assessments}
          handleDownloadPdf={handleDownloadPdf}
          isSubscribe={isSubscribe}
        />
      )}
      {assessments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
