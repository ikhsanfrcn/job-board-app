import { IJob } from "@/types/job";

export const JobContent = ({ job }: { job: IJob }) => (
  <>
    <div className="p-6 text-sm text-gray-700 leading-relaxed">
      <h3 className="font-semibold text-base mb-2 text-gray-900">
        Description
      </h3>
      <p className="whitespace-pre-line text-justify">{job.description}</p>
    </div>

    {job.tags && job.tags.length > 0 && (
      <div className="px-6 pb-6">
        <ul className="flex flex-wrap gap-2 text-xs text-gray-600">
          {job.tags.map((tag: string) => (
            <li
              key={tag}
              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);
