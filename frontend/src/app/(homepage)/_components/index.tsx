"use client"

import { useState } from "react";
import Discovery from "./discovery";
import Hero from "./hero";
import JobFilter from "./jobfilter";
import LocationModal from "./locationModal";

export default function HomePage() {
  const [jobType, setJobType] = useState<"latest" | "nearby" | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);

  return (
    <div className="max-w-screen min-h-screen">
      <Hero />
      <JobFilter />
      {!jobType && <LocationModal setJobType={setJobType} setUserCity={setUserCity} />}
      {jobType === "latest" && <Discovery />}
      {jobType === "nearby" && userCity && <Discovery city={userCity} />}
    </div>
  );
}
