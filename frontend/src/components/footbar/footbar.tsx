import Image from "next/image";
import Link from "next/link";
import SocialShare from "./social";

export default function Footbar() {
  return (
    <section className="pt-7 pb-8 bg-white border-t border-gray-300 font-sans">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl text-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-3 gap-x-3 px-8 md:px-20">
          <div className="col-span-2 md:col-span-4 lg:col-span-2 max-md:mt-5 flex flex-col items-center justify-center">
            <Image src="/logo.svg" alt="logo-pic" width={400} height={300} />
          </div>
          <div className="mt-7">
            <p className="text-sm font-bold tracking-widest text-black uppercase">
              Jobsdoors
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/job"
                  className="flex text-base text-black transition-all duration-200 hover:underline"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="flex text-base text-black transition-all duration-200 hover:underline"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex text-base text-black transition-all duration-200 hover:underline"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-7">
            <p className="text-sm font-bold tracking-widest text-black uppercase">
              Subscription
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/subscription"
                  className="flex text-base text-black transition-all duration-200 hover:underline"
                >
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-7">
            <p className="text-sm font-bold tracking-widest text-black uppercase">
              Company
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/company/register"
                  className="flex text-base text-black transition-all duration-200 hover:underline"
                >
                  Get a Free Employer Account
                </Link>
              </li>
              <li>
                <Link
                  href="/company/manage-jobs"
                  className="flex text-base text-black transition-all duration-200 hover:underline"
                >
                  Employer Center
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-7">
            <p className="text-sm font-bold tracking-widest text-black uppercase">
              Help
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/"
                  title="customer-support"
                  className="flex text-base text-black transition-all duration-200 hover:underline"
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  title="terms&conditions"
                  className="flex text-base text-black transition-all duration-200 hover:underline "
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  title="privacy-policy"
                  className="flex text-base text-black transition-all duration-200 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <SocialShare />
        <hr className="my-7 border-gray-300" />
        <p className="flex justify-center text-sm text-right text-gray-700">
          Copyright © 2025&nbsp;
          <span className="font-bold text-green-600">JobsDoors.&nbsp;</span>
          All Rights Reserved.
        </p>
      </div>
    </section>
  );
}
