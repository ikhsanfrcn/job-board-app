"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/lib/axios";
import { Application } from "@/types/applicationType";
import ApplicationCard from "./applicationCard";
import CvPreviewModal from "@/components/atoms/cvPreviewModal";
import Pagination from "@/components/atoms/pagination";
import SkeletonApplication from "./skeletonApplication";
import Filter from "./filter";

export default function PastApplications() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);

  const [loading, setLoading] = useState(false);
  const [selectedCvUrl, setSelectedCvUrl] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageFromQuery = Number(searchParams.get("page")) || 1;
    setCurrentPage(pageFromQuery);
  }, [searchParams]);

  useEffect(() => {
    if (session?.user) {
      fetchApplications(currentPage);
    }
  }, [session, currentPage, searchParams]);

  const fetchApplications = async (page = 1) => {
    if (!session?.user) return;
    const token = session.accessToken;

    const title = searchParams.get("title") || "";
    const company = searchParams.get("company") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    try {
      setLoading(true);
      const res = await axios.get(`/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
          title,
          company,
          sortBy,
          sortOrder,
        },
      });

      setApplications(res.data.applications);
      console.log(applications);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (cvUrl: string) => {
    setSelectedCvUrl(cvUrl);
  };

  const handleCloseModal = () => {
    setSelectedCvUrl(null);
  };

  const goToPage = (pageNumber: number) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", pageNumber.toString());
    router.push(`/user/activity/?${query.toString()}`);
  };

  return (
    <div className="p-6">
      <Filter />
      {loading ? (
        <SkeletonApplication />
      ) : (
        <>
          <ApplicationCard
            applications={applications}
            onViewDetail={handleViewDetail}
          />

          {applications.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          )}
        </>
      )}

      {selectedCvUrl && (
        <CvPreviewModal url={selectedCvUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
}
