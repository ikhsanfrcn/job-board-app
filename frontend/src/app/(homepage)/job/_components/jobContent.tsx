import { IJob } from "@/types/job";

export const JobContent = ({ job }: { job: IJob }) => (
  <>
    <div className="p-6 text-sm text-gray-500">
      <p><strong>Category:</strong> {job.category}</p>
      {job.salaryMin && (
        <p><strong>Salary:</strong> {job.salaryMin} {job.salaryMax && ` - ${job.salaryMax}`}</p>
      )}
      <p><strong>Deadline:</strong> {job.deadline}</p>
      <p><strong>Company:</strong> {job.company.name}</p>
      <p><strong>Description:</strong> {job.description}</p>
    </div>

    <ul className="flex gap-1.5 p-6 mt-4">
      {job.tags.map((tag: string) => (
        <li key={tag}>#{tag}</li>
      ))}
    </ul>
  </>
);
