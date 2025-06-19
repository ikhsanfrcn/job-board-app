"use client";

import { Modal } from "@/components/atoms/Modal";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registration Successful">
      <p className="text-sm">
        Your account has been created. Please check your email to verify your account before logging in.
      </p>
      <div className="mt-4 text-right">
        <button
          onClick={onClose}
          className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded text-sm"
        >
          OK
        </button>
      </div>
    </Modal>
  );
};

export default EmailVerificationModal;
