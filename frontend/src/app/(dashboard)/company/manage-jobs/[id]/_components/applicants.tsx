"use client";
import axios from "@/lib/axios";
import { IApplication } from "@/types/applicationType";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import CvPreviewModal from "./cvPreviewModal";
import Table from "./table";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

interface IProps {
  jobId: string;
}

enum ApplicationStatus {
  PENDING = "PENDING",
  VIEWED = "VIEWED",
  SHORTLISTED = "SHORTLISTED",
  INTERVIEW = "INTERVIEW",
  OFFERED = "OFFERED",
  REJECTED = "REJECTED",
}

export default function Applicants({ jobId }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: company } = useSession();
  const token = company?.accessToken;

  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState<IApplication[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    const statusFromUrl = searchParams.get("status") || "";
    if (statusFromUrl !== statusFilter) {
      setStatusFilter(statusFromUrl);
    }
  }, [searchParams]);

  const fetchApplicants = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`/applications/company/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: statusFilter ? { status: statusFilter } : {},
      });
      setApplicants(data.applications);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [token, jobId, statusFilter]);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(
        `/applications/${id}/status`,
        { status }, // payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Status updated successfully");
      setApplicants((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
    } catch (err) {
      console.log(err);
      if (err instanceof Error)
        toast.error(err.message || "Failed to update status");
    }
  };

  const filter = (status: string) => {
    setStatusFilter(status);
    const query = status ? `?status=${status}` : "";
    router.push(`/company/manage-jobs/${jobId}${query}`);
  };

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="w-full overflow-auto p-6">
      <div className="flex items-center justify-end mb-4">
        <select
          value={statusFilter}
          onChange={(e) => filter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          {Object.values(ApplicationStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <Table
        applicants={applicants}
        setPreviewUrl={setPreviewUrl}
        onUpdateStatus={handleUpdateStatus}
      />

      {previewUrl && (
        <CvPreviewModal url={previewUrl} onClose={() => setPreviewUrl(null)} />
      )}
    </div>
  );
}
