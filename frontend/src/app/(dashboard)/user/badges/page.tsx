"use client";

import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FaTrophy,
  FaCheckCircle,
  FaBullseye,
  FaChartLine,
} from "react-icons/fa";

interface IBadge {
  templateId: string;
  title: string;
  category: string;
  badgeImage: string;
  earnedAt: Date;
  score: number;
  totalPoints: number;
}

export default function BadgeInterface() {
  const [badges, setBadges] = useState<IBadge[]>([]);
  const [totalBadges, setTotalBadges] = useState(0);
  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const { data } = await axios.get("/assessment/user-badges", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBadges(data.badges);
        setTotalBadges(data.totalBadges);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [token]);

  // Calculate derived values
  const earnedCount = badges.length;
  const completionPercentage = totalBadges > 0 ? Math.round((earnedCount / totalBadges) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full text-white">
            <FaTrophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Skill Badges</h1>
            <p className="text-gray-600">
              Track your achievements and unlock new milestones
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaCheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {earnedCount}
                </p>
                <p className="text-sm text-gray-600">Badges Earned</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaBullseye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {totalBadges}
                </p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaChartLine className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {completionPercentage}%
                </p>
                <p className="text-sm text-gray-600">Completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">Overall Progress</h3>
            <span className="text-sm text-gray-600">
              {earnedCount} of {totalBadges} badges
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-sky-500 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${completionPercentage}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-1 space-y-3 h-[375px] overflow-y-auto">
        {badges.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No badges found
            </h3>
            <p className="text-gray-500">
              {"You haven't earned any badges yet."}
            </p>
          </div>
        ) : (
          badges.map((badge) => (
            <div
              key={badge.templateId}
              className="relative bg-white rounded-xl p-6 shadow-lg border border-gray-300 transition-all duration-300 hover:shadow-xl hover:bg-gray-50"
            >
              {/* Badge Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 flex items-center justify-center text-2xl font-bold text-white">
                  {badge.badgeImage ? (
                    <Image 
                      src={badge.badgeImage} 
                      alt={badge.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaTrophy />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {badge.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {badge.category}
                    </span>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <FaCheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>

              {/* Badge Status */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Score Achieved</span>
                  <span className="font-bold text-green-600">
                    {badge.score} / {badge.totalPoints} points
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Earned On</span>
                  <span className="text-sm text-gray-900">
                    {new Date(badge.earnedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}