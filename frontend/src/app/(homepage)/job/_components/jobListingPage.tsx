/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IJob } from "@/types/job";
import axios from "@/lib/axios";
import JobDetail from "./jobDetail";
import JobFilters from "./jobFilter";
import JobCard from "./jobCard";
import JobSearchHeader from "./header";
import Loading from "@/app/loading";

type Filters = {
  titleOrCategory?: string;
  city?: string;
  minSalary?: number;
  maxSalary?: number;
  worksite?: string;
  date?: string;
  sort?: string;
};

export const JobListingsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const jobIdFromQuery = searchParams.get("id");
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const jobListRef = useRef<HTMLDivElement>(null);

  const fetchJobs = async (page: number, filters: Filters) => {
    try {
      setLoading(true);
      const response = await axios.get("/jobs", {
        params: { ...filters, page },
      });

      const jobList = response.data.data.jobs;
      const pagination = response.data.data.pagination;

      setJobs((prev) => (page === 1 ? jobList : [...prev, ...jobList]));
      setTotalPages(pagination.totalPages);

      if (page === 1) {
        if (jobList.length > 0 && !jobIdFromQuery) {
          setSelectedJob(jobList[0]);
        } else if (jobList.length === 0) {
          setSelectedJob(null);
        }
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
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
    const titleOrCategory = searchParams.get("titleOrCategory") || undefined;
    const worksite = searchParams.get("worksite") || undefined;
    const minSalary = searchParams.get("minSalary")
      ? Number(searchParams.get("minSalary"))
      : undefined;
    const maxSalary = searchParams.get("maxSalary")
      ? Number(searchParams.get("maxSalary"))
      : undefined;
    const pageFromQuery = parseInt(searchParams.get("page") || "1");
    const date = searchParams.get("date") || undefined;
    const sort = searchParams.get("sort") || undefined;

    const updatedFilters: Filters = {
      city,
      titleOrCategory,
      worksite,
      minSalary,
      maxSalary,
      date,
      sort,
    };

    setFilters(updatedFilters);
    setPage(pageFromQuery);
    setInitialLoad(true);
  }, [searchParams]);

  useEffect(() => {
    if (initialLoad) {
      fetchJobs(page, filters);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  useEffect(() => {
    if (jobIdFromQuery) {
      fetchJobById(jobIdFromQuery);
    }
  }, [jobIdFromQuery]);

  useEffect(() => {
    window.scrollTo({ top: 200, behavior: "smooth" });
  }, [selectedJob]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
      setInitialLoad(true);
    }
  };

  const onJobClick = (job: IJob) => {
    setSelectedJob(job);
  };

  return (
    <div className="mt-5">
      <JobSearchHeader />
      <JobFilters filters={filters} setFilters={setFilters} />

      {loading && jobs.length === 0 ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto p-4 flex flex-col md:grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 order-1 md:order-2">
            {selectedJob ? (
              <JobDetail job={selectedJob} />
            ) : (
              <div className="p-4 text-center text-gray-500 border border-dashed rounded">
                No job selected.
              </div>
            )}
          </div>

          <div
            ref={jobListRef}
            className="space-y-2 overflow-y-auto max-h-screen order-2 md:order-1"
          >
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => onJobClick(job)}
                  isSelected={selectedJob?.id === job.id}
                />
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-500 border border-dashed border-gray-300 rounded">
                No jobs found for the selected filters.
              </div>
            )}
            {page < totalPages && (
              <button
                onClick={handleLoadMore}
                className="mt-4 p-2 w-full text-center border rounded text-shadow-sm font-semibold cursor-pointer hover:bg-green-600 hover:text-white transition duration-300"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
