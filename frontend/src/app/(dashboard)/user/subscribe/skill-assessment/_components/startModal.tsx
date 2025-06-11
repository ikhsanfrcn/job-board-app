import { IAssessment } from "@/types/assessment";
import { FaRegCheckCircle } from "react-icons/fa";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  assessment: IAssessment | null;
}

export default function StartModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  assessment 
}: ConfirmationModalProps) {
  if (!isOpen || !assessment) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaRegCheckCircle className="text-3xl text-blue-600"/>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Start Assessment
          </h3>
          
          {/* Assessment Details */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-1">{assessment.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{assessment.description}</p>
            <span className="inline-block px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              {assessment.category}
            </span>
          </div>
          
          {/* Confirmation Message */}
          <p className="text-gray-600 mb-6 text-sm">
            Are you ready to start this assessment? Make sure you have enough time to complete it. You have 30 minutes to complete the assessment.
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200 cursor-pointer"
            >
              Not Ready
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition duration-200 cursor-pointer"
            >
              Start Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}