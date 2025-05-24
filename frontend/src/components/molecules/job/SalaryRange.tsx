"use client";
import { useState } from "react";

export const SalaryRange: React.FC<{ setFilters: (filters: { salary?: string }) => void }> = ({ setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSalaryRange, setSelectedSalaryRange] = useState<string | null>(null);

  const salaryRanges = [
    { label: "1,000,000 - 5,000,000", value: "1000000-5000000" },
    { label: "5,000,000 - 10,000,000", value: "5000000-10000000" },
    { label: "10,000,000 - 20,000,000", value: "10000000-20000000" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectSalaryRange = (range: { label: string; value: string }) => {
    setSelectedSalaryRange(range.value);
    setIsOpen(false);
    setFilters({ salary: range.value });
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-2xl text-[16px] pl-[16px] py-[18.5px] border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="menu-button"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={toggleDropdown}
        >
          {selectedSalaryRange ? selectedSalaryRange : "Select Salary Range"}
          <svg
            className="ml-[8px] h-[24px] mr-[13px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06 0L10 10.394l3.71-3.184a.75.75 0 111.02 1.1l-4 3.415a.75.75 0 01-1.02 0l-4-3.415a.75.75 0 010-1.1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute z-[3] origin-top-right right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {salaryRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => handleSelectSalaryRange(range)}
                className="text-gray-700 block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                role="menuitem"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
