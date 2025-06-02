"use client";
import React, { useCallback, useEffect, useState } from "react";
import ModalDeleteJob from "./modalDeleteJob";
import ModalEditJob from "./modalEditJob";
import ModalCreateJob from "./modalCreateJob";
import JobCardSkeleton from "./skeletonJob";
import { IMJob } from "@/types/job";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import JobsCard from "./jobsCard";
import { useRouter } from "next/navigation";
import { ITest } from "@/types/test";
import ModalCreateTest from "./modalCreateTest";

export default function Jobs() {
  const { data: company } = useSession();
  const token = company?.accessToken;
  const router = useRouter();
  const [jobs, setJobs] = useState<IMJob[]>([]);
  const [tests, setTests] = useState<ITest[]>([]);
  const [editJob, setEditJob] = useState<IMJob | null>(null);
  const [deleteJob, setDeleteJob] = useState<IMJob | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateTestOpen, setIsCreateTestOpen] = useState(false);
  const [selectedJobForTest, setSelectedJobForTest] = useState<IMJob | null>(
    null
  );
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
      const response = await axios.get(`/test`);
      setTests(response.data.tests);
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

  const handleEditSave = async (updatedJob: IMJob) => {
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

  const handleCreate = async (newJob: IMJob) => {
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

  const handleTestToggle = async (job: IMJob) => {
    if (!token) return;
    try {
      const existingTest = tests.find((test) => test.jobId === job.id);
      if (existingTest) {
        const newActiveState = !existingTest.isActive;
        const endPoint = newActiveState
          ? `/test/${job.id}/activate`
          : `/test/${job.id}/deactivate`;
        await axios.patch(endPoint);
        setTests((prev) =>
          prev.map((test) =>
            test.id === existingTest.id
              ? { ...test, isActive: newActiveState }
              : test
          )
        );
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id ? { ...j, isTestActive: newActiveState } : j
          )
        );
        toast.info(
          `Test ${newActiveState ? "enabled" : "disabled"} successfully.`
        );
        return;
      } else {
        setSelectedJobForTest(job);
        setIsCreateTestOpen(true);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Failed to toggle test!");
      }
    }
  };

  // ✅ Handle test creation confirmation
  const handleCreateTestConfirm = () => {
    if (selectedJobForTest) {
      router.push(`/company/test/${selectedJobForTest.id}`);
    }
    setIsCreateTestOpen(false);
    setSelectedJobForTest(null);
  };

  const handleCreateTestCancel = () => {
    setIsCreateTestOpen(false);
    setSelectedJobForTest(null);
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
        onTestToggle={handleTestToggle}
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
      <ModalCreateTest
        isOpen={isCreateTestOpen}
        onClose={handleCreateTestCancel}
        onConfirm={handleCreateTestConfirm}
        jobTitle={selectedJobForTest?.title || ""}
      />
    </div>
  );
}
