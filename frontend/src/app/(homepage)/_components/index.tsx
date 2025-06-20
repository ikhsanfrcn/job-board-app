"use client";

import { useEffect, useState } from "react";
import Discovery from "./discovery";
import Hero from "./hero";
import JobFilter from "./jobfilter";
import LocationModal from "./locationModal";

export default function HomePage() {
  const [jobType, setJobType] = useState<"latest" | "nearby" | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const savedPreference = sessionStorage.getItem("jobPreference");
    const savedCity = sessionStorage.getItem("userCity");

    if (savedPreference) {
      setJobType(savedPreference as "latest" | "nearby");
      if (savedPreference === "nearby" && savedCity) {
        setUserCity(savedCity);
      }
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-screen min-h-screen">
      <Hero />
      <JobFilter />
      {showModal && (
        <LocationModal
          setJobType={setJobType}
          setUserCity={setUserCity}
          onClose={handleCloseModal}
        />
      )}
      {jobType === "latest" && <Discovery />}
      {jobType === "nearby" && userCity && <Discovery city={userCity} />}
    </div>
  );
}
