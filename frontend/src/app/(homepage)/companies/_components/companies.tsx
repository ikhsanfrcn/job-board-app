"use client";

import { IoMdStar } from "react-icons/io";
import SideBar from "./sideBar";
import Search from "./search";
import axios from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { ICompanyProfile } from "@/types/companyType";
import Link from "next/link";
import SkeletonCard from "./skeletonCard";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Companies() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("name") || "";
  const [companies, setCompanies] = useState<ICompanyProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const fetchCompanies = useCallback(async (query = "") => {
    try {
      setLoading(true);
      const { data } = await axios.get("/company", {
        params: query ? { name: query } : {},
      });
      setCompanies(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setSearchTerm(searchQuery);
    fetchCompanies(searchQuery);
  }, [searchQuery, fetchCompanies]);

  function handleSearch() {
    const encoded = encodeURIComponent(searchTerm.trim());
    router.push(`/companies${encoded ? `?name=${encoded}` : ""}`);
  }

  return (
    <div className="w-full flex flex-wrap">
      <div className="w-full">
        <Search
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>
      <div className="hidden lg:block lg:w-4/12">
        <SideBar />
      </div>
      <div className="w-full md:w-8/12">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : companies.map((company) => (
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
                        {company.averageRating ? company.averageRating : "-"}
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
                      11.K <span className="text-green-600">Jobs</span>
                    </p>
                    <p>
                      4.5k <span className="text-green-600">Applicants</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
