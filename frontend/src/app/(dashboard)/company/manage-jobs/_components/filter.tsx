"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaSearch, FaRedo } from "react-icons/fa";

export default function JobFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    setTitle(searchParams.get("title") || "");
    setCategory(searchParams.get("category") || "");
    setSortBy(searchParams.get("sortBy") || "createdAt");
    setSortOrder(searchParams.get("sortOrder") || "desc");
  }, [searchParams]);

  const applyFilter = () => {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (category) params.set("category", category);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    params.set("page", "1");
    router.push(`/company/manage-jobs?${params.toString()}`);
  };

  const resetFilter = () => {
    router.push("/company/manage-jobs?page=1");
  };

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between mb-6">
      <div className="flex flex-col gap-2 w-full md:flex-row md:gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. UI Designer"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Design"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full md:flex-row md:gap-4 md:w-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
          >
            <option value="createdAt">Date Created</option>
            <option value="title">Title</option>
            <option value="category">Category</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-2 md:mt-0">
        <button
          onClick={applyFilter}
          className="w-full flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          <FaSearch />
          <span>Apply</span>
        </button>
        <button
          onClick={resetFilter}
          className="w-full flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
        >
          <FaRedo />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
