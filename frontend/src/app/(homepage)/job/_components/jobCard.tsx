'use client';
import { IJob } from '@/types/job';

interface Props {
  job: IJob;
  onClick: () => void;
  isSelected: boolean;
}

export default function JobCard({ job, onClick, isSelected }: Props) {
  return (
    <div onClick={onClick} className={`p-4 cursor-pointer hover:bg-gray-100 ${isSelected ? 'border border-gray-300 rounded-lg ' : 'border border-b-gray-300 border-t-white border-l-white border-r-white'}`}>
      <p className="text-sm text-gray-600">{job.company.name}</p>
      <h3 className="font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-500">{job.city} • {job.deadline}</p>
      {job.salaryMin && (
        <p className="text-xs text-black">IDR {job.salaryMin} {job.salaryMax && ` - ${job.salaryMax}`}</p>
      )}
    </div>
  );
}
