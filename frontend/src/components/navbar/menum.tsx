import Link from "next/link";

export default function MenuMobile() {
  return (
    <div className="text-center font-[family-name:var(--font-geist-sans)]">
      <div className="block px-3 pt-2 text-lg text-shadow-sm font-bold">
        Register / Login to your account
      </div>
      <div className="block px-3 pb-8 text-md text-shadow-sm">
        to access all features on JobsDoors
      </div>
      <div className="flex justify-evenly gap-3">
        <Link
          href="/register"
          className="w-[50%] text-gray-800 px-4 py-2 border border-gray-500 rounded-lg font-bold transition duration-300 hover:text-white hover:bg-green-600"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="w-[50%] bg-black text-white px-4 py-2 rounded-lg font-bold transition duration-300 hover:bg-green-600"
        >
          Login
        </Link>
      </div>
      <hr className="my-8 text-gray-300" />
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
