"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: {
    role: string;
    count: number;
  }[];
};

export default function UserRoleDistributionChart({ data }: Props) {
  const chartData = {
    labels: data.map((item) => item.role),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">User Role Distribution</h2>
      <div className="max-w-xs">
        <Pie data={chartData} />
      </div>
    </section>
  );
}
