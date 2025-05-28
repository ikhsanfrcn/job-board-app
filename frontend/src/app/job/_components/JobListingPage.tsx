"use client";

import { useEffect, useState } from "react";
import { IJob } from "@/types/job";
import JobCard from "@/components/molecules/job/JobCard";
import JobDetail from "@/components/molecules/job/jobDetail";
import axios from "@/lib/axios";
import JobSearchHeader from "@/components/molecules/job/Header";
import JobFilters from "@/components/molecules/job/JobFilter";
import { SalaryFilter } from "@/components/molecules/job/SalaryFilter";

export const JobListingsPage: React.FC = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<{ city?: string; salary?: string }>({});


  const fetchJobs = async (page: number, filters: { city?: string }) => {
    try {
      const response = await axios.get("/jobs", {
        params: { ...filters, page },
      });
      const jobList = response.data.data.jobs;
      const pagination = response.data.data.pagination;

      if (page === 1) {
        setJobs(jobList);
      } else {
        setJobs((prevJobs) => [...prevJobs, ...jobList]);
      }

      setTotalPages(pagination.totalPages);

      if (page === 1 && jobList.length > 0) {
        setSelectedJob(jobList[0]);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };
  useEffect(() => {
    fetchJobs(page, filters);
  }, [page, filters]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="mt-20">
      <JobSearchHeader />
      <JobFilters setFilters={setFilters} />
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => setSelectedJob(job)}
              isSelected={selectedJob?.id === job.id}
            />
          ))}
          {page < totalPages && (
            <button
              onClick={handleLoadMore}
              className="mt-4 p-2 w-full text-center border rounded text-shadow-sm font-semibold cursor-pointer hover:bg-green-600 hover:text-white transition duration-300"
            >
              Load More
            </button>
          )}
          <SalaryFilter />
        </div>

        <div className="md:col-span-2">
          {selectedJob && <JobDetail job={selectedJob} />}
        </div>
      </div>
    </div>
  );
}
