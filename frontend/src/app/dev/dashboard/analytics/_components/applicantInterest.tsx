"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  data: {
    totalApplications: number;
    topCategories: { category: string; count: number }[];
    topJobs: { title: string; count: number }[];
  };
};

export default function ApplicantInterestChart({ data }: Props) {
  const categoryChartData = {
    labels: data.topCategories.map((item) => item.category),
    datasets: [
      {
        label: "Applications per Category",
        data: data.topCategories.map((item) => item.count),
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const jobChartData = {
    labels: data.topJobs.map((item) => item.title),
    datasets: [
      {
        label: "Applications per Job",
        data: data.topJobs.map((item) => item.count),
        backgroundColor: "#FF9F40",
      },
    ],
  };

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
    },
  };

  return (
    <section className="space-y-8">
      <h2 className="text-lg font-semibold">Applicant Interests</h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h3 className="font-medium mb-2">Top Job Categories</h3>
          <div className="w-full h-80">
            <Bar
              data={categoryChartData}
              options={{
                ...baseOptions,
                plugins: {
                  ...baseOptions.plugins,
                  title: { display: true, text: "By Category" },
                },
              }}
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-medium mb-2">Top Job Titles</h3>
          <div className="w-full h-80">
            <Bar
              data={jobChartData}
              options={{
                ...baseOptions,
                plugins: {
                  ...baseOptions.plugins,
                  title: { display: true, text: "By Job Title" },
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
