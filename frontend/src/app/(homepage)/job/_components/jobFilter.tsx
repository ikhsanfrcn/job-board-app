import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface JobFiltersProps {
  filters: { worksite?: string; minSalary?: number; maxSalary?: number };
  setFilters: (filters: {
    worksite?: string;
    minSalary?: number;
    maxSalary?: number;
  }) => void;
}

export default function JobFilters({ filters, }: JobFiltersProps) {
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);
  const router = useRouter();
const searchParams = useSearchParams();


  const [minSalary, setMinSalary] = useState<string>(
    filters.minSalary !== undefined ? filters.minSalary.toString() : "0"
  );
  const [maxSalary, setMaxSalary] = useState<string>(
    filters.maxSalary !== undefined ? filters.maxSalary.toString() : "300000000"
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleRemoteToggle = () => {
  const params = new URLSearchParams(searchParams.toString());
  if (params.get("worksite") === "remote") {
    params.delete("worksite");
  } else {
    params.set("worksite", "remote");
  }
  params.set("page", "1");
  router.push(`/job?${params.toString()}`);
};

  const handleSalarySubmit = () => {
  const params = new URLSearchParams(searchParams.toString());

  if (minSalary && !isNaN(Number(minSalary))) {
    params.set("minSalary", minSalary);
  } else {
    params.delete("minSalary");
  }

  if (maxSalary && !isNaN(Number(maxSalary))) {
    params.set("maxSalary", maxSalary);
  } else {
    params.delete("maxSalary");
  }

  params.set("page", "1");
  router.push(`/job?${params.toString()}`);
  setIsSalaryOpen(false);
};


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSalaryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMinSalary(
      filters.minSalary !== undefined ? filters.minSalary.toString() : "0"
    );
    setMaxSalary(
      filters.maxSalary !== undefined
        ? filters.maxSalary.toString()
        : "300000000"
    );
  }, [filters.minSalary, filters.maxSalary]);

   const handleResetFilters = () => {
    router.push(`/job`);
  };

  return (
    <div className="max-w-7xl container mx-auto flex flex-wrap gap-4 px-4 py-4 items-center relative">
      <button
        onClick={handleRemoteToggle}
        className={`px-4 py-2 rounded-full text-sm transition ${
          filters.worksite === "remote"
            ? "bg-green-500 text-white cursor-pointer"
            : "bg-gray-100 text-black hover:bg-gray-200 cursor-pointer"
        }`}
      >
        Remote only
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsSalaryOpen((prev) => !prev)}
          className="px-4 py-2 rounded-full text-sm bg-gray-100 text-black hover:bg-gray-200 cursor-pointer"
        >
          Salary Range
        </button>

        {isSalaryOpen && (
          <div className="absolute mt-2 z-10 bg-white shadow-md border rounded p-4 w-100">
            <p className="font-bold mb-4">Salary Range</p>
            <div className="flex justify-between items-center mb-4 gap-10">
              <div>
                <p>Min</p>
                <div className="flex items-center">
                  <span className="mr-1">Rp</span>
                  <input
                    type="number"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm"
                  />
                </div>
              </div>
              <div>
                <p>Max</p>
                <div className="flex items-center">
                  <span className="mr-1">Rp</span>
                  <input
                    type="number"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="relative my-4 h-6">
              <div className="absolute w-full h-1 bg-gray-300 rounded" />
              <div
                className="absolute h-1 bg-black rounded"
                style={{
                  left: `${(Number(minSalary) / 300000000) * 100}%`,
                  width: `${
                    ((Number(maxSalary) - Number(minSalary)) / 300000000) * 100
                  }%`,
                }}
              />
              <input
                type="range"
                min={0}
                max={300000000}
                step={1000000}
                value={Number(minSalary) || 0}
                onChange={(e) => {
                  const val = Math.min(
                    Number(e.target.value),
                    Number(maxSalary) || 300000000
                  );
                  setMinSalary(val.toString());
                }}
                className="absolute h-1 bg-transparent appearance-none pointer-events-auto"
                style={{
                  WebkitAppearance: "none",
                  width: "50%",
                  left: 0,
                  zIndex: 30,
                }}
              />
              <input
                type="range"
                min={0}
                max={300000000}
                step={1000000}
                value={Number(maxSalary) || 300000000}
                onChange={(e) => {
                  const val = Math.max(
                    Number(e.target.value),
                    Number(minSalary) || 0
                  );
                  setMaxSalary(val.toString());
                }}
                className="absolute h-1 bg-transparent appearance-none pointer-events-auto"
                style={{
                  WebkitAppearance: "none",
                  width: "50%",
                  right: 0,
                  zIndex: 30,
                }}
              />
            </div>

            <button
              onClick={handleSalarySubmit}
              className="bg-black hover:bg-gray-800 text-white px-4 py-1 rounded float-right text-sm"
            >
              Apply
            </button>
          </div>
        )}
      </div>
      <button
        onClick={handleResetFilters}
        className="px-4 py-2 rounded-full text-sm bg-gray-100 text-black hover:bg-gray-200 cursor-pointer"
      >
        Reset Filter
      </button>
    </div>
  );
}
