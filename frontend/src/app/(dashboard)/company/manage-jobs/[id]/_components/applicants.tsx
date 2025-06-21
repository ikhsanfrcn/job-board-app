"use client";
import axios from "@/lib/axios";
import { IApplication, ITestResult } from "@/types/applicationType";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import CvPreviewModal from "./cvPreviewModal";
import Table from "./table";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import TestResultModal from "./testResultModal";
import InterviewScheduleModal from "./interviewScheduleModal";
import RejectModal from "./rejectModal";
import Pagination from "@/components/atoms/pagination";
import SkeletonApplicant from "./skeletonApplicant";
import { IUserProfile } from "@/types/userProfile";
import UserDetailModal from "./userDetailModal";

interface IProps {
  jobId: string;
}

enum ApplicationStatus {
  PENDING = "PENDING",
  VIEWED = "VIEWED",
  SHORTLISTED = "SHORTLISTED",
  INTERVIEW = "INTERVIEW",
  OFFERED = "OFFERED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export default function Applicants({ jobId }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: company } = useSession();
  const token = company?.accessToken;

  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState<IApplication[]>([]);
  const [viewCv, setViewCv] = useState<string | null>(null);
  const [userDetail, setUserDetail] = useState<IUserProfile | null>(null);
  const [testResult, setTestResult] = useState<ITestResult | null>(null);
  const [testFullName, setTestFullName] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [interviewModalData, setInterviewModalData] = useState<{
    applicationId: string;
  } | null>(null);
  const [rejectModalData, setRejectModalData] = useState<{
    applicationId: string;
  } | null>(null);

  useEffect(() => {
    const statusFromUrl = searchParams.get("status") || "";
    const pageFromUrl = parseInt(searchParams.get("page") || "1");

    if (statusFromUrl !== statusFilter) setStatusFilter(statusFromUrl);
    if (pageFromUrl !== page) setPage(pageFromUrl);
  }, [searchParams]);

  const fetchApplicants = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`/applications/company/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: statusFilter || undefined,
          page,
          limit,
        },
      });

      setApplicants(data.applications);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [token, jobId, statusFilter, page, limit]);

  const handleUpdateStatus = async (
    id: string,
    status: string,
    reason?: string
  ) => {
    try {
      const payload = {
        status,
        ...(reason ? { reason } : {}),
      };

      await axios.patch(`/applications/${id}/status`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Status updated successfully");
      setApplicants((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
    } catch (err) {
      if (err instanceof Error)
        toast.error(err.message || "Failed to update status");
    }
  };

  const handleCreateInterviewSchedule = async ({
    applicationId,
    date,
    time,
    location,
  }: {
    applicationId: string;
    date: string;
    time: string;
    location: string;
  }) => {
    try {
      await axios.post(
        "/interviews",
        { applicationId, date, time, location },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInterviewModalData(null);
      handleUpdateStatus(applicationId, "INTERVIEW");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create interview schedule");
    }
  };

  const handleViewTestResult = (
    testResult: ITestResult,
    userFullName: string
  ) => {
    setTestResult(testResult);
    setTestFullName(userFullName);
  };

  const closeTestResultModal = () => {
    setTestResult(null);
    setTestFullName("");
  };

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
    const query = new URLSearchParams();
    if (status) query.set("status", status);
    query.set("page", "1");
    router.push(`/company/manage-jobs/${jobId}?${query.toString()}`);
  };

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
    const query = new URLSearchParams(searchParams.toString());
    if (statusFilter) query.set("status", statusFilter);
    query.set("page", pageNumber.toString());
    router.push(`/company/manage-jobs/${jobId}?${query.toString()}`);
  };

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  if (loading) return <SkeletonApplicant />;

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-end mb-4">
        <select
          value={statusFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
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
        onViewCv={setViewCv}
        onViewUserDetail={setUserDetail}
        onUpdateStatus={handleUpdateStatus}
        onViewTestResult={handleViewTestResult}
        onInterviewClick={(applicationId) =>
          setInterviewModalData({ applicationId })
        }
        onRejectClick={(applicationId) => setRejectModalData({ applicationId })}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={goToPage}
      />

      {viewCv && (
        <CvPreviewModal url={viewCv} onClose={() => setViewCv(null)} />
      )}

      {testResult && (
        <TestResultModal
          testResult={testResult}
          userFullName={testFullName}
          onClose={closeTestResultModal}
        />
      )}

      {userDetail &&(
        <UserDetailModal
          userDetail={userDetail}
          onClose={() => setUserDetail(null)}
        />
      )}

      {interviewModalData && (
        <InterviewScheduleModal
          applicationId={interviewModalData.applicationId}
          onClose={() => setInterviewModalData(null)}
          onSubmit={handleCreateInterviewSchedule}
        />
      )}

      {rejectModalData && (
        <RejectModal
          applicationId={rejectModalData.applicationId}
          onClose={() => setRejectModalData(null)}
          onSubmit={(applicationId, reason) => {
            handleUpdateStatus(applicationId, "REJECTED", reason);
            setRejectModalData(null);
          }}
        />
      )}
    </div>
  );
}
