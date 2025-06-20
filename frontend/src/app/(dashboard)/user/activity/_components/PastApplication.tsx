/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";
import { Application } from "@/types/applicationType";
import CvPreviewModal from "./cvPreviewModal";

export default function PastApplications() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCvUrl, setSelectedCvUrl] = useState<string | null>(null);

  const fetchApplications = async (page = 1) => {
    if (!session?.user) return;
    const token = session?.accessToken;

    try {
      setLoading(true);
      const res = await axios.get(`/applications?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data.applications);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(currentPage);
  }, [session, currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleViewDetail = (cvUrl: string) => {
    setSelectedCvUrl(cvUrl);
  };

  const handleCloseModal = () => {
    setSelectedCvUrl(null);
  };

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border rounded-lg shadow-sm p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{app.job.title}</h2>
                <span className="text-sm bg-green-100 text-blue-700 px-2 py-1 rounded-full">
                  {app.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{app.job.city}</p>
              <p className="text-sm">
                Salary: {app.job.salaryMin || "Not mentioned"}{" "}
                {app.job.salaryMax || "-"} | Expected:{" "}
                {app.expectedSalary || "-"}
              </p>
              <p className="text-sm text-gray-400">
                Application Date: {app.createdAt.split("T")[0]}
              </p>
              <button
                onClick={() => handleViewDetail(app.cvUrl)}
                className="text-sm text-green-600 hover:underline mt-2 cursor-pointer"
              >
                View CV
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-2 py-2 text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedCvUrl && (
        <CvPreviewModal url={selectedCvUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
}
