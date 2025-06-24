import { formatRupiah } from "@/helper/formatCurrency";
import { Application } from "@/types/applicationType";
import {
  AiOutlineCalendar,
  AiOutlineEnvironment,
  AiOutlineDollar,
  AiOutlineEye,
  AiOutlineUser,
} from "react-icons/ai";

interface IProps {
  applications: Application[];
  onViewDetail: (url: string) => void;
}

export default function ApplicationCard({
  applications,
  onViewDetail,
}: IProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "interview":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">

        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Applications Yet
        </h3>
        <p className="text-gray-500 max-w-sm">
          You haven't applied to any jobs yet. Start browsing opportunities and
          submit your first application!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div
          key={app.id}
          className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-gray-300 transition-all duration-200"
        >
          <div className="flex justify-between items-start gap-2 flex-wrap sm:flex-nowrap mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-gray-700 break-words">
                {app.job.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <AiOutlineUser className="w-4 h-4 mr-1 shrink-0" />
                <span className="truncate">{app.job.company.name}</span>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                app.status
              )} max-w-[120px] truncate text-center`}
              title={app.status}
            >
              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start text-sm text-gray-600">
              <AiOutlineEnvironment className="w-4 h-4 mr-2 text-gray-400" />
              <div className="flex flex-col min-w-0">
                <span className="font-medium">Location:</span>
                <span className="truncate">{app.job.city}</span>
              </div>
            </div>

            <div className="flex items-start text-sm text-gray-600">
              <AiOutlineCalendar className="w-4 h-4 mr-2 text-gray-400" />
              <div className="flex flex-col min-w-0">
                <span className="font-medium">Applied:</span>
                <span className="truncate">
                  {new Date(app.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-start text-sm text-gray-600">
              <AiOutlineDollar className="w-4 h-4 mr-2 text-gray-400" />
              <div className="flex flex-col min-w-0">
                <span className="font-medium">Job Salary:</span>
                <span className="truncate">
                  {app.job.salaryMin && app.job.salaryMax
                    ? `${formatRupiah(app.job.salaryMin)} - ${formatRupiah(
                        app.job.salaryMax
                      )}`
                    : "Not specified"}
                </span>
              </div>
            </div>

            <div className="flex items-start text-sm text-gray-600">
              <AiOutlineDollar className="w-4 h-4 mr-2 text-gray-400" />
              <div className="flex flex-col min-w-0">
                <span className="font-medium">Expected:</span>
                <span className="truncate">
                  {app.expectedSalary
                    ? formatRupiah(app.expectedSalary)
                    : "Not specified"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              onClick={() => onViewDetail(app.cvUrl)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
            >
              <AiOutlineEye className="w-4 h-4 mr-2" />
              View CV
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
