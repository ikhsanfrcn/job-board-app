"use client";

import axios from "@/lib/axios";
import { IUserAssessment } from "@/types/assessment";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Card from "./card";
import AssessmentSkeleton from "./skeleton";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function Assessments() {
  const { data: user } = useSession();
  const token = user?.accessToken;

  const [loading, setLoading] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [assessments, setAssessments] = useState<IUserAssessment[]>([]);

  const fetchAssessments = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get("/assessment/user-assessment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssessments(data.assessments);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

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
    fetchAssessments(), checkIsSubscribe();
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

  if (loading) return <AssessmentSkeleton />;
  if (!assessments) return <div>No assessments</div>;

  return (
    <div className="w-full p-4">
      <Card
        assessments={assessments}
        handleDownloadPdf={handleDownloadPdf}
        isSubscribe={isSubscribe}
      />
    </div>
  );
}
