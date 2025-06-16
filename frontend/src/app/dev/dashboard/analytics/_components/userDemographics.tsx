"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

type Props = {
  data: {
    totalUsers: number;
    genderDistribution: {
      Male: number;
      Female: number;
      PreferNotToSay: number;
    };
    ageDistribution: {
      under_20: number;
      "20_29": number;
      "30_39": number;
      "40_above": number;
    };
    topLocations: {
      city: string;
      count: number;
    }[];
  };
};

export default function UserDemographicsChart({ data }: Props) {
  const genderData = {
    labels: ["Male", "Female", "Prefer not to say"],
    datasets: [
      {
        label: "Gender Distribution",
        data: [
          data.genderDistribution.Male,
          data.genderDistribution.Female,
          data.genderDistribution.PreferNotToSay,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const ageData = {
    labels: ["< 20", "20–29", "30–39", "40+"],
    datasets: [
      {
        label: "Age Distribution",
        data: [
          data.ageDistribution.under_20,
          data.ageDistribution["20_29"],
          data.ageDistribution["30_39"],
          data.ageDistribution["40_above"],
        ],
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">User Demographics</h2>

      <div className="flex gap-8">
        <div>
          <h3 className="font-medium text-center mb-2">Gender Distribution</h3>
          <div className="w-full max-w-xl mx-auto">
          <Pie data={genderData} />
          </div>
        </div>

        <div>
          <h3 className="font-medium text-center mb-2">Age Distribution</h3>
          <div className="w-full max-w-xl mx-auto">
          <Bar data={ageData} />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Top User Locations</h3>
        <ul className="list-disc list-inside">
          {data.topLocations.map((loc, idx) => (
            <li key={idx}>
              {loc.city} – {loc.count} users
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
