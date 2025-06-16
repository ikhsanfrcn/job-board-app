/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import ApplicantInterestChart from "./_components/applicantInterest";
import SalaryTrendsChart from "./_components/salaryTrends";
import UserDemographicsChart from "./_components/userDemographics";
import OtherStatsSummary from "./_components/otherStatsSummary";
import UserRoleDistributionChart from "./_components/userRoleDistribution";
import axios from "@/lib/axios";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("/analytics/summary");
        setAnalytics(res.data.data);
      } catch (err) {
        console.error("Failed to load analytics", err);
      }
    };
    fetchAnalytics();
  }, []);

  if (!analytics) return <div className="p-8">Loading analytics...</div>;

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      <UserRoleDistributionChart data={analytics.otherData.userRoleDistribution} />
      <UserDemographicsChart data={analytics.userDemographics} />
      <SalaryTrendsChart data={analytics.salaryTrends} />
      <ApplicantInterestChart data={analytics.applicantInterests} />
      <OtherStatsSummary data={analytics.otherData} />
    </div>
  );
}