"use client";
import { IJob } from "@/types/job";
import { formatRupiah } from "@/helper/formatCurrency";

interface Props {
  job: IJob;
  onClick: () => void;
  isSelected: boolean;
}

export default function JobCard({ job, onClick, isSelected }: Props) {
  return (
    <div
      onClick={onClick}
      className={`p-4 transition-all duration-200 cursor-pointer rounded-md ${
        isSelected
          ? "border border-gray-300 bg-gray-50 shadow-sm"
          : "border-b border-gray-200 hover:bg-gray-50"
      }`}
    >
      <p className="text-sm text-gray-600 font-medium">{job.company.name}</p>
      <h3 className="text-base font-semibold text-gray-900">{job.title}</h3>

      <div className="flex items-center flex-wrap gap-2 mt-1 text-sm text-gray-500">
        {job.city && <span>{job.city}</span>}
        {job.worksite && (
          <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
            {job.worksite.charAt(0).toUpperCase() +
              job.worksite.slice(1).toLowerCase()}
          </span>
        )}
      </div>

      {(job.salaryMin || job.salaryMax) && (
        <p className="text-sm text-gray-700 mt-1">
          {job.salaryMin && <span>{formatRupiah(job.salaryMin)}</span>}
          {job.salaryMin && job.salaryMax && " - "}
          {job.salaryMax && <span>{formatRupiah(job.salaryMax)}</span>}
        </p>
      )}

      {job.deadline && (
        <p className="text-xs text-gray-500 mt-1">
          Deadline:{" "}
          {new Date(job.deadline).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
