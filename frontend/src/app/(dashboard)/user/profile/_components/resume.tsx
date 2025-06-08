"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "@/lib/axios";
import { IResume } from "@/types/resume";

export default function Resume() {
  const { data: user } = useSession();
  const token = user?.accessToken;

  const [resume, setResume] = useState<IResume>();
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
      console.log(data.resume);
      setResume(data.resume);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  if (loading) {
    return <div className="p-6">loading...</div>;
  }

  if (!resume) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-2 space-x-2">
          <h2 className="text-xl font-semibold">Resume</h2>
          {!isCreating && (
            <MdOutlineModeEdit
              className="text-4xl p-2 rounded-full hover:bg-gray-200 cursor-pointer"
              onClick={() => setIsCreating(true)}
            />
          )}
        </div>
        No resume found
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex items-center mb-2 space-x-2">
        <h2 className="text-xl font-semibold">Resume</h2>
        {!isEditing && (
          <MdOutlineModeEdit
            className="text-4xl p-2 rounded-full hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Keep your resume current by updating your experiences and achievements
        regularly.
      </p>

      <h2 className="font-semibold border-b-1 mb-2">Summary</h2>
      <p className="text-sm text-gray-700">
        {resume.summary || "No summary provided."}
      </p>
      <div>
        <h2 className="font-semibold border-b-1 mb-2">Work Experience</h2>
        {resume.workExperience.map((exp) => (
          <div key={exp.id} className="mt-2 pb-2">
            <div className="w-full flex justify-between">
              <div>
                <p className="text-sm font-semibold">{exp.company}</p>
                <p className="text-sm text-gray-600">
                  {exp.jobdesc?.name} · {exp.employmentType}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  year: "numeric",
                }).format(new Date(exp.startDate))}{" "}
                -{" "}
                {exp.endDate
                  ? new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      year: "numeric",
                    }).format(new Date(exp.endDate))
                  : "Present"}
              </p>
            </div>
            <p className="text-sm">{exp.description}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-semibold border-b-1 mb-2">Education</h2>
        {resume.education.map((edu) => (
          <div key={edu.id} className="mt-2">
            <div className="w-full flex justify-between">
              <div>
                <p className="text-sm font-semibold">{edu.schoolName}</p>
                <p className="text-sm text-gray-600">
                  {edu.degree}, {edu.fieldOfStudy}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  year: "numeric",
                }).format(new Date(edu.startDate))}{" "}
                -{" "}
                {edu.endDate
                  ? new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      year: "numeric",
                    }).format(new Date(edu.endDate))
                  : "Present"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-semibold border-b-1 mb-2">Leadership</h2>
        {resume.leadership.map((lead) => (
          <div key={lead.id} className="mt-2">
            <div className="w-full flex justify-between">
              <div>
                <p className="text-sm font-semibold">{lead.organization}</p>
                <p className="text-sm text-gray-600">{lead.role}</p>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(lead.startDate).toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {lead.endDate
                  ? new Date(lead.endDate).toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "Present"}
              </p>
            </div>
            <p className="text-sm">{lead.description}</p>
          </div>
        ))}
      </div>

      {resume.addtional.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            Additional Information
          </h3>
          {resume.addtional.map((item) => (
            <div key={item.id} className="text-sm text-gray-700 mb-3">
              <div className="flex items-start">
                <div className="min-w-[140px] font-semibold text-gray-800">
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1).toLowerCase()}
                  :
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">
                    {item.items.join(", ").toLowerCase()}
                  </p>
                  {item.description && (
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
