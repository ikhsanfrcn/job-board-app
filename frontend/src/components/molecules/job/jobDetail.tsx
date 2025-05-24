"use client";
import { Job } from "@/types/job";

interface Props {
  job: Job;
}

export default function JobDetail({ job }: Props) {
  return (
    <div className="border rounded-lg max-h-screen overflow-y-auto">
      <div className="border-b p-6">
        <p className="text-black">{job.company.name}</p>
        <h2 className="text-xl font-bold">{job.title}</h2>
        <p className="text-gray-700">
          {job.city} {job.salary && (`• IDR ${job.salary}`)} 
        </p>
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
        {job.tags.map((tags) => (
          <li key={tags}>#{tags}</li>
        ))}
      </ul>
    </div>
  );
}
