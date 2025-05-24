import { useState } from "react";

interface JobFiltersProps {
  setFilters: (filters: { city?: string; salary?: string }) => void;
}

export default function JobFilters({ setFilters }: JobFiltersProps) {
  const [isSalaryRangeOpen, setIsSalaryRangeOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState<string | null>(null);

  const filters = [
    { label: "Remote only", value: "Remote" },
    { label: selectedSalary || "Salary Range", value: "SalaryRange", hasDropdown: true },
    { label: "Company rating", hasDropdown: true },
    { label: "Date posted", hasDropdown: true },
  ];

  const handleFilterClick = (value: string) => {
    if (value === "Remote") {
      setFilters({ city: "Remote" });
    } else {
      setFilters({});
    }
  };

  const handleSalaryRangeSelect = (salary: string) => {
    setSelectedSalary(salary);
    setIsSalaryRangeOpen(false);
    setFilters({ salary });
  };

  return (
    <div className="container mx-auto flex flex-wrap gap-2 px-4 py-4">
      {filters.map((filter, idx) => (
        <button
          key={idx}
          onClick={() => {
            if (filter.value) {
              if (filter.value === "SalaryRange") {
                setIsSalaryRangeOpen(!isSalaryRangeOpen);
              } else {
                handleFilterClick(filter.value);
              }
            }
          }}
          className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 text-sm text-black hover:bg-gray-200"
        >
          {filter.label}
          {filter.hasDropdown && (
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      ))}

      {isSalaryRangeOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-white shadow-lg rounded-lg border">
          <div>
            <button
              onClick={() => handleSalaryRangeSelect("Salary Range")}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Salary Range
            </button>
            <button
              onClick={() => handleSalaryRangeSelect("1000000-5000000")}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              1,000,000 - 5,000,000
            </button>
            <button
              onClick={() => handleSalaryRangeSelect("5000000-10000000")}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              5,000,000 - 10,000,000
            </button>
            <button
              onClick={() => handleSalaryRangeSelect("10000000-20000000")}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              10,000,000 - 20,000,000
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
