import React from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/atoms/Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login Required" size="sm">
      <p className="mb-4">
        You must log in first before applying for this job.
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleLoginRedirect}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </Modal>
  );
};
