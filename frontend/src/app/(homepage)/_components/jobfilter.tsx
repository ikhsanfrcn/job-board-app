"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoLocationOutline, IoSearchOutline } from "react-icons/io5";

export default function JobFilter() {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    let queryParams = "";
    
    if (title && city) {
      queryParams = `?title=${title}&city=${city}`;
    } else if (title) {
      queryParams = `?title=${title}`;
    } else if (city) {
      queryParams = `?city=${city}`;
    }

    router.push(`/job${queryParams}`);
  };


  return (
    <div className="px-4 py-10 bg-gray-100 font-sans">
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
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
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
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
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
