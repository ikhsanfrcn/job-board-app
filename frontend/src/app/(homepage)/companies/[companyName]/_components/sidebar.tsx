import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-full pr-14">
      <div className="border-y border-gray-200 py-4">
        <h4 className="text-lg font-semibold mb-3">Find Companies</h4>
        <p className="text-sm text-gray-500 mb-3">
          Explore and connect with companies that match your interests.
        </p>
        <Link href="/companies">
          <button className="px-4 py-2 bg-gray-200 rounded-md mb-3 cursor-pointer hover:bg-gray-300 hover:scale-105 transition duration-300">
            Search Companies
          </button>
        </Link>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h4 className="text-lg font-semibold mb-3">Discover Jobs</h4>
        <p className="text-sm text-gray-500 mb-3">
          Find jobs that fit your skills and career goals.
        </p>
        <Link href="/job">
          <button className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 hover:scale-105 transition duration-300">
            Search Jobs
          </button>
        </Link>
      </div>
    </div>
  );
}
