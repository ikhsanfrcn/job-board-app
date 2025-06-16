"use client";

type Props = {
  data: {
    activeSubscribers: number;
    totalPublishedJobs: number;
  };
};

export default function OtherStatsSummary({ data }: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Other Statistics</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>
          <span className="font-medium">Active Subscribers:</span> {data.activeSubscribers}
        </li>
        <li>
          <span className="font-medium">Total Published Jobs:</span> {data.totalPublishedJobs}
        </li>
      </ul>
    </section>
  );
}
