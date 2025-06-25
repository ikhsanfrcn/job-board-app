import { IMJob } from "@/types/job";
import Link from "next/link";
import { BiPencil } from "react-icons/bi";
import { BsPeople, BsTrash2 } from "react-icons/bs";
import { HiOutlineCurrencyDollar, HiOutlineTag } from "react-icons/hi";
import { HiOutlineCalendarDays, HiOutlineMapPin } from "react-icons/hi2";
import { MdWorkOutline } from "react-icons/md";

interface IProps {
  jobs: IMJob[];
  setEditJob: (job: IMJob) => void;
  setDeleteJob: (job: IMJob) => void;
  onTestToggle: (job: IMJob) => void;
}

export default function JobsCard({
  jobs,
  setEditJob,
  setDeleteJob,
  onTestToggle,
}: IProps) {
  return (
    <div>
      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
          <h2 className="text-lg font-semibold mb-2">No job found</h2>
          <p className="text-sm text-gray-400 mb-6">
            Try changing the search filter or adding a new job posting.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-xl shadow-sm p-5 bg-white hover:shadow-md transition duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    job.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {job.isPublished ? "Published" : "Draft"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {job.description}
              </p>
              <div className="text-sm text-gray-500 mb-2 space-y-2">
                <div className="flex items-center gap-2">
                  <HiOutlineMapPin className="text-gray-400" />
                  <span>{job.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineTag className="text-gray-400" />
                  <span>{job.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineCalendarDays className="text-gray-400" />
                  <span>
                    {new Date(job.deadline).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {job.salaryMin && (
                  <div className="flex items-center gap-2">
                    <HiOutlineCurrencyDollar className="text-gray-400" />
                    <span>
                      {Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(Number(job.salaryMin))}
                    </span>
                  </div>
                )}
                {job.employmentStatus && (
                  <div className="flex items-center gap-2">
                    <MdWorkOutline className="text-gray-400" />
                    <span className="lowercase first-letter:capitalize">
                      {job.employmentStatus}
                    </span>
                  </div>
                )}
                {job.worksite && (
                  <div className="flex items-center gap-2">
                    <MdWorkOutline className="text-gray-400" />
                    <span className="lowercase first-letter:capitalize">
                      {job.worksite}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => onTestToggle(job)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition duration-300 cursor-pointer ${
                    job.isTestActive
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {job.isTestActive ? "Test Active" : "Test Inactive"}
                </button>
                <div className="relative group/tooltip">
                  <Link href={`/company/manage-jobs/${job.id}`}>
                    <button className="text-sm text-gray-600 p-1 rounded-full hover:text-green-500 hover:bg-gray-200 transition duration-300 hover:scale-110 cursor-pointer">
                      <BsPeople className="text-xl" />
                    </button>
                  </Link>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white text-xs rounded px-2 py-1 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
                    See Applicants
                  </div>
                </div>
                <div className="relative group/tooltip">
                  <button
                    onClick={() => setEditJob(job)}
                    className="text-sm text-gray-600 p-1 rounded-full hover:text-blue-500 hover:bg-gray-200 transition duration-300 hover:scale-110 cursor-pointer"
                  >
                    <BiPencil className="text-xl" />
                  </button>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white text-xs rounded px-2 py-1 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
                    Edit
                  </div>
                </div>
                <div className="relative group/tooltip">
                  <button
                    onClick={() => setDeleteJob(job)}
                    className="text-sm text-gray-600 p-1 rounded-full hover:text-red-500 hover:bg-gray-200 transition duration-300 hover:scale-110 cursor-pointer"
                  >
                    <BsTrash2 className="text-xl" />
                  </button>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white text-xs rounded px-2 py-1 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
                    Delete
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
