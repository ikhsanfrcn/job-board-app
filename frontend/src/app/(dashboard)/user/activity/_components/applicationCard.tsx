/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

type Props = {
  application: any;
};

export const ApplicationCard = ({ application }: Props) => {
  const job = application.job;
  const createdDate = application.createdAt.split("T")[0]; // ambil bagian "2025-05-31"

  return (
    <div className="border p-4 rounded-2xl shadow-sm mb-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
          {application.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">{job.city}</p>
      <p className="text-sm text-gray-600 mb-1">
        Salary: {job.salaryMin || "-"} - {job.salaryMax}
      </p>
      <p className="text-sm text-gray-400">Application Date: {createdDate}</p>
      <div className="mt-2">
        <a
          href={application.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          View CV
        </a>
      </div>
    </div>
  );
};
