'use client';

import { Modal } from '@/components/atoms/Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Confirm Delete" size="sm">
      <p>{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};
