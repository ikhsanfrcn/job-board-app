/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default function JobDetail({ job }: { job: IJob }) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

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

  const handleApplyClick = () => {
    if (!token) {
      setIsLoginModalOpen(true);
    } else {
      setIsApplyModalOpen(true);
    }
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
        jobId = {job.id}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
