import { Modal } from "@/components/atoms/Modal";
import { FaWhatsapp, FaTwitter, FaLink } from "react-icons/fa";

export const ShareModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share this Job" size="sm">
      <div className="space-y-3">
        <button
          onClick={() =>
            window.open(
              `https://wa.me/?text=${encodeURIComponent(`Check out this job: ${shareUrl}`)}`,
              "_blank"
            )
          }
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
        >
          <FaWhatsapp />
          Share to WhatsApp
        </button>

        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(shareUrl);
              alert("Link copied!");
            } catch {
              alert("Failed to copy.");
            }
          }}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded w-full hover:bg-gray-700"
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
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          <FaTwitter />
          Share to Twitter
        </button>
      </div>
    </Modal>
  );
};
