import { toast } from "react-toastify";

export const validateFile = (file: File) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 1 * 1024 * 1024; // 1MB

  if (!allowedTypes.includes(file.type)) {
    toast.error("Only .jpg, .jpeg, and .png files are allowed.");
    return false;
  }

  if (file.size > maxSize) {
    toast.error("File size must be less than 1MB.");
    return false;
  }

  return true;
};