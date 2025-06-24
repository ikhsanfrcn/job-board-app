"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/atoms/Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login Required" size="sm">
      <div className="text-sm text-gray-600 mb-4">
        You need to log in before applying for this job.
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleLoginRedirect}
          className="px-4 py-2 text-sm rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
        >
          Login
        </button>
      </div>
    </Modal>
  );
}
