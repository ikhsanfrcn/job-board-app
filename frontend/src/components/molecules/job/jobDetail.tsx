"use client";

import { useState } from "react";
import { IJob } from "@/types/job";
import { Modal } from "@/components/atoms/Modal";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";

export default function JobDetail({ job }: {job: IJob}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expectedSalary, setExpectedSalary] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const { data: session } = useSession();

  const handleApply = async () => {
    const token = session?.accessToken;
    if (!cvFile) {
      setSubmitStatus("CV file is required.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const formData = new FormData();
      formData.append("jobId", job.id);
      formData.append("expectedSalary", expectedSalary);
      formData.append("cvUrl", cvFile);

      await axios.post("/applications", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSubmitStatus("Successfully applied!");
      setExpectedSalary("");
      setCvFile(null);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus("");
      }, 1500);
    } catch (error) {
      console.error(error);
      setSubmitStatus("Failed to apply. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-lg max-h-screen overflow-y-auto">
      <div className="flex justify-between border-b items-center p-6">
        <div>
          <p className="text-black">{job.company.name}</p>
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p className="text-gray-700">
            {job.city} {job.salary && `• IDR ${job.salary}`}
          </p>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply for this Job
          </button>
        </div>
      </div>

      <div className="p-6 text-sm text-gray-500">
        <p>
          <strong>Category:</strong> {job.category}
        </p>
        {job.salary && (
          <p>
            <strong>Salary:</strong> {job.salary}
          </p>
        )}
        <p>
          <strong>Deadline:</strong> {job.deadline}
        </p>
        <p>
          <strong>Company:</strong> {job.company.name}
        </p>
        <p>
          <strong>Description:</strong> {job.description}
        </p>
      </div>

      <ul className="flex gap-1.5 p-6 mt-4">
        {job.tags.map((tag: string) => (
          <li key={tag}>#{tag}</li>
        ))}
      </ul>

      {/* Apply Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Apply for this Job"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Expected Salary
            </label>
            <input
              type="number"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              className="border px-3 py-2 rounded w-full"
              placeholder="Enter expected salary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Upload CV (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setCvFile(e.target.files[0]);
                }
              }}
              className="block w-full text-sm"
              required
            />
          </div>

          <button
            onClick={handleApply}
            disabled={isSubmitting}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>

          {submitStatus && <p className="text-sm mt-2">{submitStatus}</p>}
        </div>
      </Modal>
    </div>
  );
}
