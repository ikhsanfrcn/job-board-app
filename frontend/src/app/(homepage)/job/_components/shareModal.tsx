"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/atoms/Modal";
import { FaWhatsapp, FaTwitter, FaLink } from "react-icons/fa";
import { toast } from "react-toastify";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
}

export default function ShareModal({ isOpen, onClose, jobId }: ShareModalProps) {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/job?id=${jobId}`);
    }
  }, [jobId]);

  const baseButtonStyle =
    "flex items-center gap-2 px-4 py-2 text-sm rounded-md w-full transition";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share this Job" size="sm">
      <div className="space-y-2">
        <button
          onClick={() =>
            window.open(
              `https://wa.me/?text=${encodeURIComponent(`Check out this job: ${shareUrl}`)}`,
              "_blank"
            )
          }
          className={`${baseButtonStyle} bg-green-500 text-white hover:bg-green-600`}
        >
          <FaWhatsapp />
          WhatsApp
        </button>

        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(shareUrl);
              toast.success("Link copied to clipboard!");
              onClose();
            } catch {
              toast.error("Failed to copy link.");
            }
          }}
          className={`${baseButtonStyle} bg-gray-700 text-white hover:bg-gray-800`}
        >
          <FaLink />
          Copy Link
        </button>

        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this job: ${shareUrl}`)}`,
              "_blank"
            )
          }
          className={`${baseButtonStyle} bg-blue-500 text-white hover:bg-blue-600`}
        >
          <FaTwitter />
          Twitter
        </button>
      </div>
    </Modal>
  );
}
