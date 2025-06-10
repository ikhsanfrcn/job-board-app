"use client";

import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSkeleton from "./_components/loadingSkeleton";
import { IAssessment } from "@/types/assessment";
import ModaleditAssessment from "./_components/modalEditAssessment";
import ModalDeleteAssessment from "./_components/modalDeleteAssessment";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useSession } from "next-auth/react";

export default function Page() {
  const [assessments, setAssessments] = useState<IAssessment[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] =
    useState<IAssessment | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const token = session?.accessToken;

  // Fetch assessments
  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/assessment");
      setAssessments(data);
    } catch (error) {
      toast.error("Failed to fetch assessments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single assessment with questions for editing
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

  // Open delete modal
  const openDeleteModal = (assessment: IAssessment) => {
    setSelectedAssessment(assessment);
    setIsDeleteModalOpen(true);
  };

  // Close modals
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAssessment(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAssessment(null);
  };

  // Handle success callbacks
  const handleEditSuccess = () => {
    fetchAssessments(); // Refresh the list
  };

  const handleDeleteSuccess = () => {
    fetchAssessments(); // Refresh the list
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  return (
    <div className="flex-1 overflow-auto">
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
                    {idx + 1}
                  </div>
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
    </div>
  );
}
