"use client";
import axios from "@/lib/axios";
import { ICompanyProfile } from "@/types/companyType";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import SkeletonDetail from "./skeletonDetail";
import Image from "next/image";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";
import Review from "./review";
import Jobs from "./jobs";

interface IProps {
  id: string;
}

export default function Detail({ id }: IProps) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<ICompanyProfile | null>(null);
  const [activeTab, setActiveTab] = useState<"Overview" | "Reviews" | "Jobs">(
    "Overview"
  );

  const fetchDetail = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/company/${id}`);
      setDetail(data.data);
    } catch (err) {
      console.error("Error fetching company detail:", err);
      setDetail(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  if (loading || !detail) return <SkeletonDetail />;

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl font-semibold">{detail.name} Overview</h2>
              <div className="flex items-center gap-1 text-xl font-semibold">
                <p>{detail.averageRating}</p>
                <IoIosStar />
              </div>
            </div>
            <p className="text-sm">{detail.about}</p>
          </div>
        );
      case "Reviews":
        return <Review companyId={id} />;

      case "Jobs":
        return <Jobs companyId={id} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full border border-gray-200 rounded-xl">
      <div className="w-full p-4">
        <div className="w-24 h-24 border border-gray-200 rounded-lg mb-4 overflow-hidden bg-gray-100">
          {detail.logo && (
            <Image
              src={detail.logo}
              width={200}
              height={200}
              alt={detail.name}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-xl font-semibold">{detail.name}</h2>
            {detail.isVerify && (
              <div className="flex items-center text-sm ml-1 text-gray-500">
                <MdOutlineVerified className="mr-1" />
                <span>Engaged Employer</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Link href={`/review/${id}`}>
              <button className="px-4 py-2 text-white text-sm bg-black rounded-md hover:scale-105 transition duration-300 cursor-pointer">
                Add a review
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full flex gap-6 mb-5 border-b border-gray-200">
          {["Overview", "Reviews", "Jobs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`py-2 border-b-2 transition-all duration-200 text-sm cursor-pointer ${
                activeTab === tab
                  ? "border-green-600 text-black"
                  : "border-transparent text-gray-600 hover:text-black hover:border-green-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
}
