"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IJob } from "@/types/job";
import JobDetail from "@/app/(homepage)/job/_components/jobDetail";
import axios from "@/lib/axios";
import JobSearchHeader from "@/app/(homepage)/job/_components/Header";
import JobFilters from "./jobFilter";
import JobCard from "./jobCard";

type Filters = {
  title?: string;
  city?: string;
  minSalary?: number;
  maxSalary?: number;
};

export const JobListingsPage: React.FC = () => {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const jobIdFromQuery = searchParams.get("id");

  const [jobs, setJobs] = useState<IJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<Filters>({});

  const fetchJobs = async (page: number, filters: Filters) => {
    try {
      const response = await axios.get("/jobs", {
        params: { ...filters, page },
      });
      const jobList = response.data.data.jobs;
      const pagination = response.data.data.pagination;

      setJobs(page === 1 ? jobList : (prev) => [...prev, ...jobList]);
      setTotalPages(pagination.totalPages);

      if (page === 1 && jobList.length > 0 && !selectedJob && !jobIdFromQuery) {
        setSelectedJob(jobList[0]);
        // router.replace(`?id=${jobList[0].id}`);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const fetchJobById = async (id: string) => {
    try {
      const response = await axios.get(`/jobs/${id}`);
      const job = response.data.data;
      setSelectedJob(job);

      setJobs((prev) => {
        const exists = prev.some((j) => j.id === job.id);
        return exists ? prev : [job, ...prev];
      });
    } catch (error) {
      console.error("Failed to fetch job by ID:", error);
    }
  };

  useEffect(() => {
  const city = searchParams.get("city") || undefined;
  const title = searchParams.get("title") || undefined;
  const pageFromQuery = parseInt(searchParams.get("page") || "1");

  const updatedFilters = {
    city,
    title,
  };

  setFilters(updatedFilters);
  setPage(pageFromQuery);
  fetchJobs(pageFromQuery, updatedFilters);

  const jobId = searchParams.get("id");
  if (jobId) {
    fetchJobById(jobId);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchParams]);


  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onJobClick = (job: IJob) => {
    setSelectedJob(job);
    // router.replace(`?id=${job.id}`);
  };

  return (
    <div className="mt-20">
      <JobSearchHeader />
      <JobFilters filters={filters} setFilters={setFilters} />
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 overflow-y-auto max-h-screen">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => onJobClick(job)}
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
        </div>

        <div className="md:col-span-2">
          {selectedJob && <JobDetail job={selectedJob} />}
        </div>
      </div>
    </div>
  );
};
