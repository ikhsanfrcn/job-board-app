import { Modal } from "@/components/atoms/Modal";
import axios from "@/lib/axios";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  token?: string;
  onSuccess: () => void;
}

export const ApplyModal = ({ isOpen, onClose, jobId, token, onSuccess }: Props) => {
  const [expectedSalary, setExpectedSalary] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = async () => {
    if (!cvFile) {
      setStatus("CV is required.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("expectedSalary", expectedSalary);
      formData.append("cvUrl", cvFile);

      const config = {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };

      await axios.post("/applications", formData, config);

      setStatus("Applied successfully!");
      onSuccess();
    } catch (err) {
      console.error(err);
      setStatus("Failed to apply.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Apply for this Job" size="md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Expected Salary</label>
          <input
            type="number"
            value={expectedSalary}
            onChange={(e) => setExpectedSalary(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload CV (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setCvFile(e.target.files?.[0] || null)}
            className="block w-full text-sm"
          />
        </div>

        <button
          onClick={handleApply}
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {status && <p className="text-sm mt-2">{status}</p>}
      </div>
    </Modal>
  );
};
