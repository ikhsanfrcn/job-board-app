import React from "react";
import { BiX } from "react-icons/bi";

interface CvPreviewModalProps {
  url: string;
  onClose: () => void;
}

export default function CvPreviewModal({ url, onClose }: CvPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 lg:-top-6 lg:-right-10 z-50"
          title="Close"
        >
          <BiX className="text-3xl text-white hover:text-gray-300 transition duration-300 cursor-pointer" />
        </button>

        <div className="bg-white w-full h-full rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
            className="w-full h-full"
            title="CV Preview"
          />
        </div>
      </div>
    </div>
  );
}
