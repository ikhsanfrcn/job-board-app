"use client";

import axios from "@/lib/axios";
import { IJob } from "@/types/job";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaRegClock, FaTags } from "react-icons/fa";
import SkeletonJob from "./skeletonJob";

interface IProps {
  companyId: string;
}

export default function Jobs({ companyId }: IProps) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // jobs per page

  const fetchCompanyJobs = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/company/${companyId}/jobs?page=${page}&limit=${limit}`
        );
        setJobs(data.jobs);
        setTotalPages(data.pagination.totalPages);
        setCurrentPage(data.pagination.currentPage);
      } catch (err) {
        console.error("Error fetching company jobs:", err);
      } finally {
        setLoading(false);
      }
    },
    [companyId]
  );

  useEffect(() => {
    fetchCompanyJobs();
  }, [fetchCompanyJobs]);

  const handlePrev = () => {
    if (currentPage > 1) fetchCompanyJobs(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) fetchCompanyJobs(currentPage + 1);
  };

  if (loading) return <SkeletonJob />;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Jobs</h2>

      {jobs && jobs.length > 0 ? (
        <>
          <ul className="space-y-4 w-full">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="flex flex-col gap-4 p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition duration-200 bg-white w-full"
              >
                {/* Title + Link */}
                <div className="flex justify-between items-start flex-wrap">
                  <Link
                    href={`/job?id=${job.id}`}
                    className="text-green-700 hover:underline text-xl font-semibold"
                  >
                    {job.title}
                  </Link>

                  {job.isTestActive && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-md">
                      TEST
                    </span>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{job.city}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <FaTags className="text-gray-400" />
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full text-gray-700 text-xs font-medium">
                      {job.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <FaRegClock className="text-gray-400" />
                    <span className="text-gray-700 font-medium">
                      Deadline:{" "}
                      {new Date(job.deadline).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                {job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Salary Info */}
                {(job.salaryMin || job.salaryMax) && (
                  <div className="text-sm text-gray-700">
                    Salary Range:{" "}
                    <span className="font-semibold">
                      Rp{job.salaryMin?.toLocaleString("id-ID") ?? "-"} – Rp
                      {job.salaryMax?.toLocaleString("id-ID") ?? "-"}
                    </span>
                  </div>
                )}

                {/* Created At */}
                <div className="text-xs text-gray-400">
                  Posted on:{" "}
                  {new Date(job.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg text-sm font-medium bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg text-sm font-medium bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500 mt-2">No job postings available.</p>
      )}
    </div>
  );
}
