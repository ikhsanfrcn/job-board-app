"use client";

import axios from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSkeleton from "./_components/loadingSkeleton";
import { IAssessment } from "@/types/assessment";
import ModaleditAssessment from "./_components/modalEditAssessment";
import ModalDeleteAssessment from "./_components/modalDeleteAssessment";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/atoms/pagination";

export default function Page() {
  const [assessments, setAssessments] = useState<IAssessment[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] =
    useState<IAssessment | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const token = session?.accessToken;
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const [totalPages, setTotalPages] = useState(1);

  const fetchAssessments = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", currentPage.toString());
      params.set("size", "5");
      const { data } = await axios.get("/assessment", {
        params: Object.fromEntries(params.entries()),
      });
      setAssessments(data.assessments || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error("Failed to fetch assessments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchParams, currentPage]);

  const handlePageChange = (page: number) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", page.toString());
    router.push(`/dev/dashboard/assessment?${query.toString()}`);
  };

  const editAssessment = async (id: string) => {
    try {
      const { data } = await axios.get(`/assessment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedAssessment(data);
      setIsEditModalOpen(true);
    } catch (error) {
      toast.error("Failed to fetch assessment details");
      console.error(error);
    }
  };

  const openDeleteModal = (assessment: IAssessment) => {
    setSelectedAssessment(assessment);
    setIsDeleteModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAssessment(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAssessment(null);
  };

  const handleEditSuccess = () => {
    fetchAssessments();
  };

  const handleDeleteSuccess = () => {
    fetchAssessments();
  };

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  return (
    <div className="flex-1 overflow-auto mb-18">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <nav className="text-sm text-gray-500">
            <span>🏠 / Dashboards / Assessment </span>
          </nav>
        </div>
        <div className="w-full flex flex-col font-sans">
          <h2 className="flex justify-center font-semibold text-xl mb-10">
            Skill Assessment
          </h2>
          {loading ? (
            <LoadingSkeleton />
          ) : assessments.length > 0 ? (
            assessments.map((a, idx) => (
              <div
                key={a.id}
                className="mb-4 p-4 border border-gray-300 rounded flex-row sm:flex items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-5">
                  <div className="border-b border-gray-300 text-shadow-sm">
                    {(currentPage - 1) * 5 + idx + 1}
                  </div>
                  <Image
                    src={a.badgeImage}
                    alt={a.title}
                    height={40}
                    width={40}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{a.title}</h3>
                    <p className="text-gray-600">{a.description}</p>
                  </div>
                </div>
                <div className="flex justify-end sm:items-center mt-3 sm:mt-0 gap-3">
                  <span className="w-20 text-xs text-gray-800 bg-green-200 p-3 rounded-lg text-center mr-3">
                    {a.category}
                  </span>
                  <button
                    onClick={() => editAssessment(a.id)}
                    className="p-3 text-gray-500 hover:text-sky-500 hover:bg-gray-100 rounded-full transition duration-300"
                    title="Edit Assessment"
                  >
                    <LuPencil className="text-xl" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(a)}
                    className="p-3 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full transition duration-300"
                    title="Delete Assessment"
                  >
                    <LuTrash2 className="text-xl" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No Skill Assessment</p>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <ModaleditAssessment
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        assessment={selectedAssessment}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Confirmation Modal */}
      <ModalDeleteAssessment
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        assessment={selectedAssessment}
        onSuccess={handleDeleteSuccess}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
