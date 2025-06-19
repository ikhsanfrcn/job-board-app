"use client";

import { useState, useEffect } from "react";
import { IJob } from "@/types/job";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";
import { JobHeader } from "./jobHeader";
import { JobContent } from "./jobContent";
import { ApplyModal } from "./applyModal";
import { ShareModal } from "./shareModal";
import { LoginModal } from "./loginModal";
import { TestConfirmModal } from "./testModal";

export default function JobDetail({ job }: { job: IJob }) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showTestConfirmModal, setShowTestConfirmModal] = useState(false);

  const { data: session } = useSession();
  const token = session?.accessToken;

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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    window.location.href = `/usertest/${job.id}`;
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
      />

      <TestConfirmModal
        isOpen={showTestConfirmModal}
        onClose={() => setShowTestConfirmModal(false)}
        onProceed={handleProceedToTest}
      />
    </div>
  );
}
