import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizeClass = {
    sm: "w-[300px]",
    md: "w-[500px]",
    lg: "w-[700px]",
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className={`bg-white rounded shadow-md p-6 ${sizeClass}`}>
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 text-2xl leading-none cursor-pointer hover:text-gray-800"
            >
              ×
            </button>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};
