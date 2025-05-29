"use client";
import axios from "@/lib/axios";
import { ICompanyProfile } from "@/types/companyType";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import SkeletonDetail from "./skeletonDetail";
import Image from "next/image";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";
import { FaUserSecret } from "react-icons/fa";

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
        return (
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Reviews</h2>
            {detail.Review && detail.Review.length > 0 ? (
              <div className="space-y-6">
                {detail.Review.map((review, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1 text-black text-sm font-medium">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <IoIosStar
                            key={i}
                            className={`text-lg ${
                              i < review.rating ? "text-black" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-gray-700 ml-1">
                          ({review.rating}/5)
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 p-2 bg-white shadow-lg border border-gray-200 rounded-full overflow-hidden">
                        <FaUserSecret className="w-full h-full object-contain text-gray-600" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-800">
                        {review.jobTitle}
                      </h4>
                    </div>
                    <div className="mb-3">
                      <h4 className="text-sm text-green-600 font-semibold mb-1">
                        Pros
                      </h4>
                      <p className="text-sm text-gray-700">{review.pros}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-red-600 font-semibold mb-1">
                        Cons
                      </h4>
                      <p className="text-sm text-gray-700">{review.cons}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}
          </div>
        );

      case "Jobs":
        return (
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Jobs</h2>
            <p className="text-sm text-gray-500">No job postings available.</p>
          </div>
        );
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
            <button className="px-4 py-2 text-white text-sm bg-black rounded-md hover:scale-105 transition duration-300 cursor-pointer">
              Follow
            </button>

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
