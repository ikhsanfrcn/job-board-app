"use client";

import { useState } from "react";

export default function LocationModal({ setJobType, setUserCity, onClose }: { setJobType: (type: "latest" | "nearby") => void; setUserCity: (city: string) => void; onClose: () => void }) {
  const [step, setStep] = useState<"choice" | "requesting">("choice");

  const handleShowLatest = () => {
    setJobType("latest"); // ✅ Load latest jobs
    sessionStorage.setItem("jobPreference", "latest");
    onClose();
  };

  const handleShowNearby = () => {
    setStep("requesting"); // ✅ Show modal requesting location

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await res.json();
          const cityName = data.city || "Unknown";

          setUserCity(cityName); // ✅ Set city for location-based job search
          setJobType("nearby");
          // Store the choice and city in sessionStorage
          sessionStorage.setItem("jobPreference", "nearby");
          sessionStorage.setItem("userCity", cityName);
          onClose(); // Close the modal
        },
        () => {
          setJobType("latest"); // ✅ Default to latest jobs if denied
          sessionStorage.setItem("jobPreference", "latest");
          onClose(); // Close the modal
        }
      );
    } else {
      setJobType("latest"); // ✅ Handle geolocation unavailable case
      sessionStorage.setItem("jobPreference", "latest");
      onClose(); // Close the modal
    }
  };

  return (
    <div className="fixed w-full inset-0 flex items-center justify-center">
      <div className="shadow-lg bg-gray-50 p-6 rounded-lg text-center w-[70%] font-sans">
        {step === "choice" ? (
          <>
            <h2 className="text-xl font-bold mb-5">Location Access</h2>
            <p className="text-gray-600 mb-5">Would you like to see jobs near your location or view the latest jobs?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={handleShowLatest} className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-pointer hover:bg-green-600 transition duration-200">
                Latest Jobs
              </button>
              <button onClick={handleShowNearby} className="px-4 py-2 bg-sky-400 hover:text-white rounded-md cursor-pointer hover:bg-green-600 transition duration-200">
                Jobs Near Me
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Requesting Location</h2>
            <p className="text-gray-600 mb-4">Please respond to the browser's location request prompt.</p>
            <p className="text-gray-500">If you deny access, we'll show you the latest jobs instead.</p>
          </>
        )}
      </div>
    </div>
  );
}
