"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { IoWarningOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface IAssessment {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: IAssessment | null;
  onSuccess: () => void;
}

export default function ModalDeleteAssessment({
  isOpen,
  onClose,
  assessment,
  onSuccess,
}: DeleteModalProps) {
  if (!isOpen || !assessment) return null;

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/assessment/${assessment.id}`);
      toast.success(data.message);
      onSuccess();
      onClose();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        console.log(err);
      } else {
        toast.error("Delete assessment failed!");
        console.log(err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full m-4 font-sans">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <IoWarningOutline className="w-7 h-7 text-red-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Delete Assessment
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Are you sure you want to delete &quot;{assessment.title}&quot;? This action cannot be undone.
              </p>
            </div>
          </div>
          
          <div className="flex gap-5 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition duration-200 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}