"use client";

import { IApplication, ITestResult } from "@/types/applicationType";
import Image from "next/image";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

interface IProps {
  applicants: IApplication[];
  setPreviewUrl: (url: string | null) => void;
  onUpdateStatus: (id: string, status: string) => void;
  onViewTestResult?: (testResult: ITestResult, userFullName: string) => void;
  onInterviewClick: (applicationId: string) => void;
}
export default function Table({
  applicants,
  setPreviewUrl,
  onUpdateStatus,
  onViewTestResult,
  onInterviewClick,
}: IProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleTestResultClick = (app: IApplication) => {
    const testData = app.user.userTest?.[0];
    if (testData && onViewTestResult) {
      const fullName = `${app.user.firstName || ""} ${
        app.user.lastName || ""
      }`.trim();
      onViewTestResult(testData, fullName);
    }
  };

  const hasTestResult = (app: IApplication): boolean => {
    return !!(app.user.userTest && app.user.userTest.length > 0);
  };

  return (
    <table className="w-full text-sm text-left border-collapse">
      <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
        <tr>
          <th className="p-3 border-b">Photo</th>
          <th className="p-3 border-b">Name</th>
          <th className="p-3 border-b">Education</th>
          <th className="p-3 border-b">Expected Salary</th>
          <th className="p-3 border-b">Applied At</th>
          <th className="p-3 border-b">CV</th>
          <th className="p-3 border-b">Test</th>
          <th className="p-3 border-b">Status</th>
          <th className="p-3 border-b">Action</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((app) => (
          <tr
            key={app.id}
            className="hover:bg-gray-50 transition-colors duration-150"
          >
            <td className="p-3 border-b">
              <Image
                src={app.user.avatar}
                width={40}
                height={40}
                alt={app.user.firstName || "applicant-photo"}
                className="w-10 h-10 rounded-full object-cover border"
              />
            </td>
            <td className="p-3 border-b font-medium text-gray-800">
              {app.user.firstName}
            </td>
            <td className="p-3 border-b text-gray-600">{app.user.education}</td>
            <td className="p-3 border-b text-gray-600">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(Number(app.expectedSalary))}
            </td>
            <td className="p-3 border-b text-gray-600">
              {new Intl.DateTimeFormat("id-ID", {
                timeZone: "Asia/Jakarta",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(app.createdAt))}
            </td>
            <td className="p-3 border-b">
              {app.cvUrl ? (
                <button
                  onClick={() => setPreviewUrl(app.cvUrl)}
                  className="text-green-600 hover:underline hover:text-green-800 transition"
                >
                  View CV
                </button>
              ) : (
                <span className="text-gray-400 italic">No CV</span>
              )}
            </td>
            <td className="p-3 border-b">
              {hasTestResult(app) ? (
                <button
                  onClick={() => handleTestResultClick(app)}
                  className="text-sky-500 hover:underline hover:text-sky-700 transition"
                >
                  View Result
                </button>
              ) : (
                <span className="text-gray-400 italic">No Test</span>
              )}
            </td>
            <td className="p-3 border-b capitalize">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full
      ${
        {
          PENDING: "bg-yellow-100 text-yellow-800",
          VIEWED: "bg-gray-100 text-gray-800",
          SHORTLISTED: "bg-blue-100 text-blue-800",
          INTERVIEW: "bg-purple-100 text-purple-800",
          OFFERED: "bg-green-100 text-green-800",
          REJECTED: "bg-red-100 text-red-800",
        }[app.status] || "bg-gray-100 text-gray-700"
      }`}
              >
                {app.status.toLowerCase()}
              </span>
            </td>

            <td className="p-3 border-b relative">
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setOpenId(app.id === openId ? null : app.id)}
                  className="p-1.5 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                  <HiDotsVertical className="w-5 h-5 text-gray-600" />
                </button>

                {openId === app.id && (
                  <div
                    tabIndex={0}
                    onBlur={() => setOpenId(null)}
                    className="absolute z-10 mt-2 right-0 w-40 bg-white border border-gray-200 rounded shadow-lg p-2 space-y-1"
                  >
                    {["PENDING", "VIEWED"].includes(app.status) && (
                      <button
                        onClick={() => {
                          onUpdateStatus(app.id, "SHORTLISTED");
                          setOpenId(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        Mark as Shortlisted
                      </button>
                    )}

                    {app.status === "SHORTLISTED" && (
                      <button
                        onClick={() => {
                          onInterviewClick(app.id);
                          setOpenId(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        Schedule Interview
                      </button>
                    )}

                    {app.status === "INTERVIEW" && (
                      <>
                        <button
                          onClick={() => {
                            onUpdateStatus(app.id, "OFFERED");
                            setOpenId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          Mark as Offered
                        </button>
                        <button
                          onClick={() => {
                            onUpdateStatus(app.id, "REJECTED");
                            setOpenId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-red-100 rounded"
                        >
                          Mark as Rejected
                        </button>
                      </>
                    )}
                    {app.status === "OFFERED" && (
                      <>
                        <button
                          onClick={() => {
                            onUpdateStatus(app.id, "ACCEPTED");
                            setOpenId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          Mark as Accepted
                        </button>
                        <button
                          onClick={() => {
                            onUpdateStatus(app.id, "REJECTED");
                            setOpenId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-red-100 rounded"
                        >
                          Mark as Rejected
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
