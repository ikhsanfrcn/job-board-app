"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function JobSearchHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [titleOrCategory, setTitleOrCategory] = useState(
    searchParams.get("titleOrCategory") || ""
  );
  const [city, setCity] = useState(searchParams.get("city") || "");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (titleOrCategory) params.set("titleOrCategory", titleOrCategory);
    if (city) params.set("city", city);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white px-4 py-6 border-b">
      <div className="max-w-4xl mx-auto flex gap-2 mb-4">
        <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2">
          <span className="text-gray-500 mr-2">🔍</span>
          <input
            type="text"
            placeholder="Find your perfect job"
            value={titleOrCategory}
            onChange={(e) => setTitleOrCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="bg-transparent w-full outline-none"
          />
        </div>
        <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2">
          <span className="text-gray-500 mr-2">📍</span>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="bg-transparent w-full outline-none"
          />
        </div>
      </div>

      <div className="text-center text-green-600 font-medium mb-4">
        ⚡ Upload your resume – let employers find you
      </div>

      <div className="max-w-xs mx-auto flex justify-between text-sm font-medium border-b border-gray-200">
        <button className="flex-1 text-gray-700 border-b-2 border-green-600 py-2 hover:text-black">
          Search
        </button>
      </div>
    </div>
  );
}
