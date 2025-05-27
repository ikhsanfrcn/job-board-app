import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-full pr-14">
      <div className="border-y border-gray-200 py-4">
        <h4 className="text-lg font-semibold mb-3">Followed companies</h4>
        <p className="text-sm text-gray-500 mb-3">
          Stay ahead in opportunities and insider tips by following your dream
          companies.
        </p>
        <Link href="/companies">
          <button className="px-4 py-2 bg-gray-200 rounded-md mb-3 cursor-pointer hover:bg-gray-300 hover:scale-105 transition duration-300">
            Search for companies
          </button>
        </Link>
      </div>

      <div className="border-b border-gray-200 py-4">
        <h4 className="text-lg font-semibold mb-3">Saved jobs</h4>
        <p className="text-sm text-gray-500 mb-3">
          Get personalized job recommendations and updates by starting your
          searches.
        </p>
        <Link href="/jobs">
          <button className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 hover:scale-105 transition duration-300">
            Search jobs
          </button>
        </Link>
      </div>
    </div>
  );
}
