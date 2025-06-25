import { formatRupiah } from "@/helper/formatCurrency";
import { IJob } from "@/types/job";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface JobHeaderProps {
  job: IJob;
  hasApplied: boolean;
  isChecking: boolean;
  onApplyClick: () => void;
  onShareClick: () => void;
}

export default function JobHeader({
  job,
  hasApplied,
  isChecking,
  onApplyClick,
  onShareClick,
}: JobHeaderProps) {
  return (
    <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center border-b p-6 gap-4 bg-white">
      {/* TEST Badge */}
      {job.isTestActive && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-bl-md rounded-tr-md">
          Test Required
        </div>
      )}

      {/* Logo & Job Info */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="w-24 h-24 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
          <Image
            src={job.company.logo}
            alt={job.company.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500 font-medium">
            {job.company.name}
          </p>
          <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>

          {/* Badges & Location */}
          <div className="flex flex-wrap items-center gap-2 mt-0.5">
            {job.city && (
              <span className="text-sm text-gray-700">{job.city}</span>
            )}

            {job.worksite && (
              <span className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                {job.worksite.charAt(0).toUpperCase() +
                  job.worksite.slice(1).toLowerCase()}
              </span>
            )}

            {job.employmentStatus && (
              <span className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                {job.employmentStatus.charAt(0).toUpperCase() +
                  job.employmentStatus.slice(1).toLowerCase()}
              </span>
            )}
          </div>

          {/* Salary */}
          {(job.salaryMin || job.salaryMax) && (
            <p className="text-sm text-gray-800">
              {job.salaryMin && <span>{formatRupiah(job.salaryMin)}</span>}
              {job.salaryMin && job.salaryMax && " - "}
              {job.salaryMax && <span>{formatRupiah(job.salaryMax)}</span>}
            </p>
          )}

          {/* Time Info */}
          <div className="text-xs text-gray-400 space-y-0.5 mt-1">
            <p>
              Posted{" "}
              {formatDistanceToNow(new Date(job.createdAt), {
                addSuffix: true,
              })}
            </p>
            {job.deadline && (
              <p className="text-gray-500">
                Deadline:{" "}
                {new Date(job.deadline).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 self-end md:self-auto">
        <button
          onClick={onApplyClick}
          disabled={hasApplied || isChecking}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
            hasApplied || isChecking
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-800"
          }`}
        >
          {isChecking ? "Checking..." : hasApplied ? "Applied" : "Apply"}
        </button>
        <button
          onClick={onShareClick}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-sm font-medium text-gray-800 transition"
        >
          Share
        </button>
      </div>
    </div>
  );
}
