import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function MiddleMenu() {
  const { data: session } = useSession();

  return (
    <div className="hidden lg:flex gap-10 h-full items-center text-sm font-semibold font-sans">
      <Link
        href="/subscription"
        className="relative group h-full flex items-center"
      >
        <span className="relative after:absolute after:left-1/2 after:top-9.5 after:w-0 after:h-1 after:bg-gray-300 after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:left-0">
          Subscription
        </span>
      </Link>
      <Link href="/job" className="relative group h-full flex items-center">
        <span className="relative after:absolute after:left-1/2 after:top-9.5 after:w-0 after:h-1 after:bg-gray-300 after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:left-0">
          Jobs
        </span>
      </Link>
      <Link
        href="/companies"
        className="relative group h-full flex items-center"
      >
        <span className="relative after:absolute after:left-1/2 after:top-9.5 after:w-0 after:h-1 after:bg-gray-300 after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:left-0">
          Companies
        </span>
      </Link>
      <Link
        href="/salary"
        className="relative group h-full flex items-center"
      >
        <span className="relative after:absolute after:left-1/2 after:top-9.5 after:w-0 after:h-1 after:bg-gray-300 after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:left-0">
          Salaries
        </span>
      </Link>
      {!session?.user && (
        <div className="relative group h-full flex items-center">
          <span className="relative cursor-pointer after:absolute after:left-1/2 after:top-9.5 after:w-0 after:h-1 after:bg-gray-300 after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:left-0">
            For Employers
          </span>
          <div className="absolute top-14 -left-51 transform -translate-x-1/2 mt-2 bg-white p-4 w-[600px] shadow-sm opacity-0 scale-95 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
            <div className="flex items-center">
              <Image
                src="/employerlogo.jpg"
                height={150}
                width={150}
                alt="employer-logo"
                className="w-48 object-fill"
              />
              <Link
                href="/company/register"
                className="hover:bg-gray-300 px-2 py-2 w-48"
              >
                <span>Unlock employer profile</span>
                <br />
                <br />
                <span className="font-light">
                  Register your company to attract the right talent for the job.
                </span>
              </Link>
              <Link
                href="/company/login"
                className="hover:bg-gray-300 px-2 py-2 w-48"
              >
                <span>Login to employer center</span>
                <br />
                <br />
                <span className="font-light">
                  Manage your company profile, view analytics, and respond to
                  reviews.
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
