import { IJob } from "@/types/job";
import Link from "next/link";
import { BiPencil } from "react-icons/bi";
import { BsPeople, BsTrash2 } from "react-icons/bs";
import { HiOutlineCurrencyDollar, HiOutlineTag } from "react-icons/hi";
import { HiOutlineCalendarDays, HiOutlineMapPin } from "react-icons/hi2";

interface IProps {
  jobs: IJob[];
  setEditJob: (job: IJob) => void;
  setDeleteJob: (job: IJob) => void;
}
export default function JobsCard({ jobs, setEditJob, setDeleteJob }: IProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border border-gray-200 rounded-xl shadow-sm p-5 bg-white hover:shadow-md transition duration-300 hover:scale-105"
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
              {job.salary && (
                <div className="flex items-center gap-2">
                  <HiOutlineCurrencyDollar className="text-gray-400" />
                  <span>Rp. {job.salary}</span>
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
            <div className="flex justify-end gap-2">
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
    </div>
  );
}
