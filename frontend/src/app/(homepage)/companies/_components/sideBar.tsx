"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SideBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setCompany(searchParams.get("name") || "");
    setCity(searchParams.get("city") || "");
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (company.trim()) params.set("name", company.trim());
    if (city.trim()) params.set("city", city.trim());
    if (sort) params.set("sort", sort);

    router.push(`/companies?${params.toString()}`);
  };

  const handleReset = () => {
    setCompany("");
    setCity("");
    setSort("");
    router.push("/companies");
  };

  return (
    <div className="w-full p-4 lg:pr-14">
      <h2 className="text-2xl text-gray-800 font-semibold mb-5">
        Explore Companies
      </h2>
      <h2 className="text-xl text-gray-800 font-semibold">Filter Companies</h2>
      <p className="text-sm text-gray-600 mb-5">Showing filtered results</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full text-sm p-2 border border-gray-200 bg-gray-100 rounded-full"
            placeholder="Search company name"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full text-sm p-2 border border-gray-200 bg-gray-100 rounded-full"
            placeholder="Search city"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Sort by</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full text-sm p-2 border border-gray-200 bg-gray-100 rounded-full"
          >
            <option value="">Default</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
            <option value="rating_desc">Rating (High to Low)</option>
            <option value="rating_asc">Rating (Low to High)</option>
          </select>
        </div>
        <div className="w-full flex space-x-4">
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white bg-green-700 rounded-full hover:bg-green-900 transition cursor-pointer"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 bg-white rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
