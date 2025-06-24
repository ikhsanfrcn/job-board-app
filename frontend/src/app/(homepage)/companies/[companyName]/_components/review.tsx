"use client";

import { formatCurrency } from "@/helper/formatCurrency";
import axios from "@/lib/axios";
import { IReview } from "@/types/review";
import { useCallback, useEffect, useState } from "react";
import { FaUserSecret } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import SkeletonReview from "./skeletonReview";
import { useSearchParams, useRouter } from "next/navigation";

interface IProps {
  companyId: string;
}

export default function Review({ companyId }: IProps) {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchReview = useCallback(async () => {
    try {
      setLoading(true);
      const page = parseInt(searchParams.get("reviewPage") || "1", 10);
      const { data } = await axios.get(`/reviews/company/${companyId}`, {
        params: {
          page,
          limit: 5,
        },
      });

      setReviews(data.reviews);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [companyId, searchParams]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("reviewPage", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (loading) return <SkeletonReview />;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        <>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="relative group flex items-center gap-1 text-black text-sm font-medium">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IoIosStar
                        key={i}
                        className={`text-lg ${
                          i < review.averageRating
                            ? "text-black"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-gray-700 ml-1">
                      ({review.averageRating}/5)
                    </span>

                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-white border border-gray-300 rounded-xl shadow-xl px-4 py-3 text-xs text-gray-800 z-10 min-w-[220px] space-y-2">
                      <div className="flex justify-between">
                        <span>Culture</span>
                        <span className="flex items-center gap-1">
                          {review.cultureRating}/5
                          <IoIosStar className="text-black text-sm" />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Work-life Balance</span>
                        <span className="flex items-center gap-1">
                          {review.workLifeBalanceRating}/5
                          <IoIosStar className="text-black text-sm" />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Facilities</span>
                        <span className="flex items-center gap-1">
                          {review.facilitiesRating}/5
                          <IoIosStar className="text-black text-sm" />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Career Opportunities</span>
                        <span className="flex items-center gap-1">
                          {review.careerOpportunitiesRating}/5
                          <IoIosStar className="text-black text-sm" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 p-2 bg-white shadow-md border border-gray-200 rounded-full overflow-hidden">
                    <FaUserSecret className="w-full h-full text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {review.jobTitle}
                    </h4>
                    {review.salaryEstimate && (
                      <p className="text-xs text-gray-500">
                        Estimated Salary:{" "}
                        <span className="font-medium">
                          {formatCurrency(review.salaryEstimate)}
                        </span>
                      </p>
                    )}
                  </div>
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

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg text-sm font-medium bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg text-sm font-medium bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500">No reviews available yet.</p>
      )}
    </div>
  );
}
