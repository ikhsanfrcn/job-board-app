"use client";

import axios from "@/lib/axios";
import { IJob } from "@/types/job";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SkeletonSugest from "./skeletonSugest";

export default function Sugestion() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<IJob[] | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      const { data } = await axios.get("/jobs", {
        params: {
          isPublished: true,
          size: 1000,
        },
      });

      const allJobs: IJob[] = data.data.jobs || [];
      const shuffled = allJobs.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);

      setJobs(selected);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (loading) return <SkeletonSugest />;

  return (
    <div className="w-full pl-14">
      <div className="w-full border border-gray-200 rounded-xl p-4">
        <h4 className="text-lg font-semibold mb-3">Jobs You May Like</h4>

        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <Link
              key={job.id}
              href={`/job?id=${job.id}`}
              className="group block mb-4 p-3 rounded-lg hover:bg-gray-50 transition duration-300 hover:scale-105 cursor-pointer border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden relative">
                  {job.company?.logo && (
                    <Image
                      src={job.company.logo}
                      alt={job.company.name || "Company Logo"}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {job.company?.name || "Unknown Company"}
                  </p>
                  <p className="text-sm text-gray-500">{job.city}</p>
                </div>
              </div>

              <p className="font-semibold text-gray-900 group-hover:text-green-700 transition duration-300 text-base">
                {job.title}
              </p>

              <div className="text-sm text-gray-600 font-se mt-1">
                {job.salaryMin && (
                  <p>
                    Rp.{job.salaryMin.toLocaleString("id-ID")} - Rp.
                    {job.salaryMax?.toLocaleString("id-ID")}
                  </p>
                )}
              </div>

              {job.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-xs px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500 mt-2">
            No job suggestions found.
          </p>
        )}
      </div>
    </div>
  );
}
