"use client"

import { IDiscover } from "@/types/discoverJob";
import axios from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { FcMoneyTransfer } from "react-icons/fc";
import { useEffect, useState } from "react";

export default function Discovery({city}: {city?: string}) {
  const [jobs, setJobs] = useState<IDiscover[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/jobs", {
          params: city ? { city } : {},
        });

        const sortedJobs = res.data.data.jobs
          .sort((a: IDiscover, b: IDiscover) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 6);

        setJobs(sortedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [city]);


  return (
    <div className="p-6 max-w-screen mx-auto my-10 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{city ? `Jobs in ${city}` : "All Jobs"}</h2>
          <p className="text-gray-600">Explore job opportunities</p>
        </div>
        <div>
          <Link
            href={"/job"}
            className="bg-black text-white hover:bg-green-600 px-3 py-2 rounded-lg cursor-pointer transition duration-200"
          >
            View all
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading
          ? // ✅ Skeleton Loader
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="border rounded-lg text-sm shadow-md bg-gray-50 p-6 animate-pulse"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="w-1/2 h-4 bg-gray-200 rounded-md"></div>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-md mt-4"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded-md mt-2"></div>
                <div className="w-full h-6 bg-gray-200 rounded-md mt-5"></div>
                <div className="w-full h-10 bg-gray-200 rounded-md mt-4"></div>
              </div>
            ))
          : jobs.length > 0
          ? jobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-lg text-sm shadow-md bg-white p-6 hover:shadow-lg transition duration-100 relative"
              >
                  {job.isTestActive && 
                <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-green-600 text-white px-3 py-2">
                  T<br/>E<br/>S<br/>T
                </div>
                }
                <div className="flex items-center gap-2">
                  {/* Company Logo */}
                  <Image
                    src={job.company.logo}
                    width={40}
                    height={40}
                    alt="company-logo"
                    className="rounded-full w-auto h-auto"
                  />
                  <div>
                    {/* Job Title */}
                    <h3 className="text-lg font-bold text-gray-700">
                      {job.title}
                    </h3>

                    {/* Company & Location */}
                    <p className="text-gray-500 text-sm">
                      {job.company.name} - {job.city}
                    </p>
                  </div>
                </div>

                {/* Salary */}
                <div className="flex gap-2 items-center">
                  <FcMoneyTransfer className="text-sm" />
                  <span className="my-5">
                    IDR {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}
                  </span>
                </div>

                {/* Description */}
                <p className="font-semibold">Job description</p>
                <p className="text-gray-600 my-3 line-clamp-2">
                  {job.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 my-3">
                  {job.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Deadline */}
                <p className="text-red-500 text-sm font-medium mt-5">
                  Deadline: {job.deadline}
                </p>

                {/* View Details Button */}
                <Link href={{pathname: "/job", query: {id: job.id}}}>
                  <button className="mt-4 w-full bg-white border px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 hover:text-white cursor-pointer">
                    View Details
                  </button>
                </Link>
              </div>
            ))
          : "No Jobs Found"}
      </div>
    </div>
  );
}
