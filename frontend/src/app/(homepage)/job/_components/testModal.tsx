"use client";

import { Modal } from "@/components/atoms/Modal";

interface TestConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export function TestConfirmModal({
  isOpen,
  onClose,
  onProceed,
}: TestConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Test required"
      size="sm"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-700">
          This job requires a test before applying. Would you like to take the test now?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onProceed}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Take the Test
          </button>
        </div>
      </div>
    </Modal>
  );
}
