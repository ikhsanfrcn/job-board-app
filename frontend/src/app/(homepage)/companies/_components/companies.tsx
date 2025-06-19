"use client";

import { IoMdStar } from "react-icons/io";
import SideBar from "./sideBar";
import axios from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { ICompanyProfile } from "@/types/companyType";
import Link from "next/link";
import SkeletonCard from "./skeletonCard";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function Companies() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const nameQuery = searchParams.get("name") || "";
  const cityQuery = searchParams.get("city") || "";
  const sortQuery = searchParams.get("sort") || "";
  const pageQuery = parseInt(searchParams.get("page") || "1");

  const [companies, setCompanies] = useState<ICompanyProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/company", {
        params: {
          ...(nameQuery && { name: nameQuery }),
          ...(cityQuery && { city: cityQuery }),
          ...(sortQuery && { sort: sortQuery }),
          page: pageQuery,
          limit: 6, 
        },
      });
      setCompanies(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    } finally {
      setLoading(false);
    }
  }, [nameQuery, cityQuery, sortQuery, pageQuery]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newPage > 1) {
      params.set("page", String(newPage));
    } else {
      params.delete("page");
    }

    router.push(`/companies?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-wrap mt-5">
      <div className="w-full lg:w-4/12">
        <SideBar />
      </div>
      <div className="w-full md:w-8/12">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          <>
            {companies.map((company) => (
              <Link href={`/companies/${company.id}`} key={company.id}>
                <div className="w-full p-4 rounded-lg hover:bg-gray-100 mb-5 cursor-pointer">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="w-16 h-16 flex-shrink-0 border border-gray-200 overflow-hidden">
                      {company.logo ? (
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={500}
                          height={500}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300" />
                      )}
                    </div>
                    <h4 className="text-md font-semibold">{company.name}</h4>
                    <div className="flex items-center space-x-1 text-green-600">
                      <p className="text-sm font-medium">
                        {company.averageRating === 0
                          ? "-"
                          : company.averageRating}
                      </p>
                      <IoMdStar className="text-base" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm mb-2">
                    <p>1000+ employees</p>
                    <span className="h-1 w-1 bg-black rounded-full" />
                    {company.city && <p>{company.city}</p>}
                  </div>
                  {company.about && (
                    <p className="line-clamp-2 mb-2">{company.about}</p>
                  )}

                  <div className="flex items-center space-x-4 text-sm">
                    <p>
                      {company.totalJobs === 0 ? "-" : company.totalJobs}{" "}
                      <span className="text-green-600">Jobs</span>
                    </p>
                    <p>
                      {company.totalApplicants === 0
                        ? "-"
                        : company.totalApplicants}{" "}
                      <span className="text-green-600">Applicants</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {companies.length === 0 && !loading && (
              <div className="w-full p-4 text-gray-500">
                <p className="text-lg font-medium">No companies found.</p>
                <p className="text-sm mt-1">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}

            {companies.length > 0 && (
              <div className="p-5 flex justify-center items-center space-x-4">
                <button
                  onClick={() => handlePageChange(pageQuery - 1)}
                  disabled={pageQuery <= 1}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {pageQuery} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pageQuery + 1)}
                  disabled={pageQuery >= totalPages}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
