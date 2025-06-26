"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IJob } from "@/types/job";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";
import { JobContent } from "./jobContent";
import { ApplyModal } from "./applyModal";
import ShareModal from "./shareModal";
import { TestConfirmModal } from "./testModal";
import JobHeader from "./jobHeader";
import LoginModal from "./loginModal";
import { ConfirmModal } from "@/components/atoms/ConfirmModal";

export default function JobDetail({ job }: { job: IJob }) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showTestConfirmModal, setShowTestConfirmModal] = useState(false);
  const [showIncompleteProfileModal, setShowIncompleteProfileModal] =
    useState(false);

  const { data: session } = useSession();
  const token = session?.accessToken;
  const router = useRouter();

  useEffect(() => {
    const checkIfApplied = async () => {
      if (!token) {
        setHasApplied(false);
        setIsChecking(false);
        return;
      }

      try {
        setIsChecking(true);
        const res = await axios.get("/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const applied = res.data.applications.some(
          (app: any) => app.jobId === job.id
        );
        setHasApplied(applied);
      } catch (err) {
        console.error(err);
      } finally {
        setIsChecking(false);
      }
    };

    checkIfApplied();
  }, [job.id, token]);

  const getUserProfile = async () => {
    try {
      const res = await axios.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.user;
    } catch (err) {
      console.error("Error fetching user profile:", err);
      return null;
    }
  };

  const isUserProfileIncomplete = (profile: any): boolean => {
    const requiredFields = [
      "firstName",
      "state",
      "city",
      "dob",
      "education",
      "gender",
    ];
    return requiredFields.some((field) => !profile?.[field]);
  };

  const checkIfTestActive = async (): Promise<boolean> => {
    try {
      const res = await axios.get(`/test/check/${job.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data?.isTestActive === true;
    } catch (err) {
      console.error("Error checking test status:", err);
      return false;
    }
  };

  const checkIfTestCompleted = (): boolean => {
    return localStorage.getItem(`test-${job.id}-completed`) === "true";
  };

  const handleApplyClick = async () => {
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    const userProfile = await getUserProfile();

    if (!userProfile || isUserProfileIncomplete(userProfile)) {
      setShowIncompleteProfileModal(true);
      return;
    }

    const isTestActive = await checkIfTestActive();
    const isTestDone = checkIfTestCompleted();

    if (isTestActive && !isTestDone) {
      setShowTestConfirmModal(true);
    } else {
      setIsApplyModalOpen(true);
    }
  };

  const handleProceedToTest = () => {
    setShowTestConfirmModal(false);
    router.push(`/usertest/${job.id}`);
  };

  const handleRedirectToProfile = () => {
    setShowIncompleteProfileModal(false);
    router.push("/user/profile");
  };

  return (
    <div className="border rounded-lg max-h-screen overflow-y-auto">
      <JobHeader
        job={job}
        hasApplied={hasApplied}
        isChecking={isChecking}
        onApplyClick={handleApplyClick}
        onShareClick={() => setIsShareModalOpen(true)}
      />

      <JobContent job={job} />

      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobId={job.id}
        token={token}
        onSuccess={() => {
          setHasApplied(true);
          setIsApplyModalOpen(false);
        }}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        jobId={job.id}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        jobId={job.id}
      />

      <TestConfirmModal
        isOpen={showTestConfirmModal}
        onClose={() => setShowTestConfirmModal(false)}
        onProceed={handleProceedToTest}
      />

      <ConfirmModal
        isOpen={showIncompleteProfileModal}
        onCancel={() => setShowIncompleteProfileModal(false)}
        onConfirm={handleRedirectToProfile}
        message="Data diri Anda belum lengkap. Apakah Anda ingin melengkapi sekarang?"
      />
    </div>
  );
}
