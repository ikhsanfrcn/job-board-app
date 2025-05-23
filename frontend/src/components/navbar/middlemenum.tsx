import Link from "next/link";

export default function MiddleMenuMobile() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Link
        href={"/subscription"}
        className="block w-full px-4 py-2 mb-2 text-sm hover:bg-gray-200 transition duration-300"
      >
        Subscription
      </Link>
      <Link
        href={"/jobs"}
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
      <Link
        href={"/salaries"}
        className="block w-full px-4 py-2 mb-2 text-sm hover:bg-gray-200 transition duration-300"
      >
        Salaries
      </Link>
    </div>
  );
}
