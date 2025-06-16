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
    jobTitle: string;
    city: string;
    averageSalary: number;
    sampleCount: number;
  }[];
};

export default function SalaryTrendsChart({ data }: Props) {
  const chartData = {
    labels: data.map((item) => `${item.jobTitle} (${item.city})`),
    datasets: [
      {
        label: "Average Salary",
        data: data.map((item) => item.averageSalary),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Average Salary by Job Title and City",
      },
    },
  };

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Salary Trends</h2>
      <div className="w-full max-w-xl">
      <Bar data={chartData} options={options} />
      </div>
    </section>
  );
}
