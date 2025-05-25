"use client";
import React, { useCallback, useEffect, useState } from "react";
import ModalDeleteJob from "./modalDeleteJob";
import ModalEditJob from "./modalEditJob";
import ModalCreateJob from "./modalCreateJob";
import JobCardSkeleton from "./skeletonJob";
import { IJob } from "@/types/job";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import JobsCard from "./jobsCard";

export default function Jobs() {
  const { data: company } = useSession();
  const token = company?.accessToken;

  const [jobs, setJobs] = useState<IJob[]>([]);
  const [editJob, setEditJob] = useState<IJob | null>(null);
  const [deleteJob, setDeleteJob] = useState<IJob | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchJobs = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get("/jobs/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(data.data.jobs);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = async () => {
    if (!deleteJob || !token) return;
    try {
      await axios.delete(`/jobs/${deleteJob.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs((prev) => prev.filter((job) => job.id !== deleteJob.id));
      setDeleteJob(null);
      toast.warning("Job Deleted!");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Delete Failed!");
      }
    }
  };

  const handleEditSave = async (updatedJob: IJob) => {
    if (!token) return;
    try {
      await axios.patch(`/jobs/${updatedJob.id}`, updatedJob, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs((prev) =>
        prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );
      setEditJob(null);
      toast.info("Update Success !");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Update Failed !");
      }
    }
  };

  const handleCreate = async (newJob: IJob) => {
    try {
      await axios.post("/jobs", newJob, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs((prev) => [...prev, newJob]);
      setIsCreateOpen(false);
      toast.success("Create Success !");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Create Failed !");
      }
    }
  };
  if (loading) {
    return <JobCardSkeleton />;
  }
  return (
    <div className="w-full p-6 space-y-4">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Add Job
        </button>
      </div>

      <JobsCard
        jobs={jobs}
        setEditJob={setEditJob}
        setDeleteJob={setDeleteJob}
      />

      <ModalEditJob
        editJob={editJob}
        setEditJob={setEditJob}
        handleEditSave={handleEditSave}
      />
      <ModalDeleteJob
        deleteJob={deleteJob}
        setDeleteJob={setDeleteJob}
        handleDelete={handleDelete}
      />
      <ModalCreateJob
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        handleCreate={handleCreate}
      />
    </div>
  );
}
