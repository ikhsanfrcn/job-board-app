"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "@/lib/axios";
import { IResume } from "@/types/resume";
import ResumeDetail from "./resumeDetail";
import ResumeForm from "./resumeForm";

export default function Resume() {
  const { data: user } = useSession();
  const token = user?.accessToken;

  const [resume, setResume] = useState<IResume | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="w-full p-6 space-y-6">
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

      <p className="text-sm text-gray-600 mb-6">
        Keep your resume current by updating your experiences and achievements regularly.
      </p>

      {/* Create mode */}
      {!resume && isCreating && (
        <ResumeForm
          token={token}
          setResume={setResume}
          setIsCreating={setIsCreating}
        />
      )}

      {/* Resume doesn't exist */}
      {!resume && !isCreating && (
        <p className="text-sm text-gray-600 mb-6">
          You don&apos;t have a resume yet. Create one.
        </p>
      )}

      {/* View or edit resume */}
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
