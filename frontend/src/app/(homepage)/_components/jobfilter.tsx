"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoLocationOutline, IoSearchOutline } from "react-icons/io5";

export default function JobFilter() {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (title) params.set("title", title);
    if (city) params.set("city", city);
    params.set("page", "1");

    router.push(`/job?${params.toString()}`);
  };

  return (
    <div className="w-full px-4 py-10 bg-gray-100 font-sans">
      <div className="flex justify-center">
        <h3 className="text-3xl font-semibold tracking-tight">
          Start to find your dream job
        </h3>
      </div>
      <div className="flex gap-4 my-10 justify-center">
        <div className="w-[25%] pl-3 sm:pl-9 pr-3 py-2 border rounded-md relative">
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full focus:outline-0"
          />
          <div className="max-sm:hidden absolute left-2 top-2.5">
            <IoSearchOutline className="text-lg text-gray-500" />
          </div>
        </div>
        <div className="w-[25%] pl-3 sm:pl-9 pr-3 py-2 border rounded-md relative">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full focus:outline-0"
          />
          <div className="max-sm:hidden absolute left-2 top-2.5">
            <IoLocationOutline className="text-lg text-gray-500" />
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="w-[25%] px-3 py-2 bg-black text-white rounded-md cursor-pointer transition duration-200 hover:bg-green-600"
        >
          Search
        </button>
      </div>
    </div>
  );
}
