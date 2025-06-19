import Link from "next/link";

export default function MiddleMenuMobile() {
  return (
    <div className="font-sans">
      <Link
        href={"/subscription"}
        className="block w-full px-4 py-2 mb-2 text-sm hover:bg-gray-200 transition duration-300"
      >
        Subscription
      </Link>
      <Link
        href={"/job"}
        className="block w-full px-4 py-2 mb-2 text-sm hover:bg-gray-200 transition duration-300"
      >
        Jobs
      </Link>
      <Link
        href={"/companies"}
        className="block w-full px-4 py-2 mb-2 text-sm hover:bg-gray-200 transition duration-300"
      >
        Companies
      </Link>
    </div>
  );
}
