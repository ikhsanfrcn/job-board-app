"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "@/lib/axios";
import { IResume } from "@/types/resume";
import ResumeDetail from "./resumeDetail";
import ResumeForm from "./resumeForm";
import ResumeSkeleton from "./resumeSkeleton";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Resume() {
  const { data: user } = useSession();
  const token = user?.accessToken;

  const [resume, setResume] = useState<IResume | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // ✅ New state

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

  const fetchResume = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get("/resumes/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResume(data.resume);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const { data } = await axios.get("/resumes/generate-pdf", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Failed to download PDF");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    fetchResume();
    checkIsSubscribe();
  }, [fetchResume, checkIsSubscribe]);

  if (loading) {
    return (
      <div className="p-6">
        <ResumeSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center mb-2 space-x-2">
          <h2 className="text-xl font-semibold">Resume</h2>
          {!isEditing && resume && (
            <MdOutlineModeEdit
              className="text-4xl p-2 rounded-full hover:bg-gray-200 cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          )}
          {!resume && !isCreating && (
            <MdOutlineModeEdit
              className="text-4xl p-2 rounded-full hover:bg-gray-200 cursor-pointer"
              onClick={() => setIsCreating(true)}
            />
          )}
        </div>
        <div>
          <button
            onClick={() => {
              if (isSubscribe && !isDownloading) {
                handleDownloadPdf();
              }
            }}
            disabled={!isSubscribe || isDownloading}
            data-tooltip-id={!isSubscribe ? "pdf-tooltip" : undefined}
            data-tooltip-content="You must subscribe to generate CV"
            className={`text-sm px-4 py-2 rounded-md transition duration-300 ${
              isSubscribe
                ? isDownloading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isDownloading ? "Downloading..." : "Generate CV"}
          </button>

          {!isSubscribe && (
            <Tooltip
              id="pdf-tooltip"
              place="top"
              style={{
                backgroundColor: "#1f2937",
                color: "white",
                fontSize: "0.75rem",
                borderRadius: "6px",
                padding: "6px 10px",
              }}
            />
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Keep your resume current by updating your experiences and achievements
        regularly.
      </p>

      {!resume && isCreating && (
        <ResumeForm
          token={token}
          setResume={setResume}
          setIsCreating={setIsCreating}
        />
      )}

      {!resume && !isCreating && (
        <p className="text-sm text-gray-600 mb-6">
          You don&apos;t have a resume yet. Create one.
        </p>
      )}

      {resume && !isEditing && <ResumeDetail resume={resume} />}

      {resume && isEditing && (
        <ResumeForm
          token={token}
          setResume={setResume}
          setIsCreating={setIsEditing}
          initialResume={resume}
          isEditMode={true}
        />
      )}
    </div>
  );
}
