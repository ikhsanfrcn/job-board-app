import { IJob } from "@/types/job";

interface JobHeaderProps {
  job: IJob;
  hasApplied: boolean;
  isChecking: boolean;
  onApplyClick: () => void;
  onShareClick: () => void;
}

export const JobHeader = ({
  job,
  hasApplied,
  isChecking,
  onApplyClick,
  onShareClick,
}: JobHeaderProps) => (
  <div className="relative flex justify-between border-b items-center p-6">
    <div>
      {job.isTestActive && (
        <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-green-600 text-white px-3 py-2">
          TEST reqiured
        </div>
      )}
      <p className="text-black">{job.company.name}</p>
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-700">
        {job.city} {job.worksite && `• ${job.worksite}`}
      </p>
      <p className="text-gray-700">
        {job.salaryMin && `IDR ${job.salaryMin}`}{" "}
        {job.salaryMax && ` - ${job.salaryMax}`}
      </p>
    </div>
    <div className="flex gap-2">
      <button
        onClick={onApplyClick}
        disabled={hasApplied || isChecking}
        className={`${
          hasApplied || isChecking
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white px-4 py-2 rounded`}
      >
        {isChecking ? "Checking..." : hasApplied ? "Applied" : "Apply"}
      </button>
      <button
        onClick={onShareClick}
        className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
      >
        Share
      </button>
    </div>
  </div>
);
