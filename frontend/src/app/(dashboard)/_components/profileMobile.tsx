"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function ProfileMobile() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const username = session?.user?.username;
  const role = session?.user?.role;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="relative md:hidden">
      <div
        className="w-10 h-10 overflow-hidden rounded-full cursor-pointer"
        onClick={toggleDropdown}
      >
        <Image
          src={
            session?.user.avatar ||
            "https://res.cloudinary.com/dexlqslwj/image/upload/v1744257672/blank-image_yfczs3_ogl5pp.jpg"
          }
          alt="avatar"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      {isDropdownVisible && (
        <div className="absolute z-[60]  w-64 bg-white text-black rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {email ? (
            <div className="p-4 space-y-3">
              <div>
                <p className="text-lg font-semibold">{username}</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>

              <hr className="border-gray-200" />

              <Link
                href={role === "company" ? "/company/profile" : "/user/profile"}
              >
                <button className="w-full text-left text-sm px-3 py-2 hover:bg-gray-100 rounded-md transition duration-200 font-medium">
                  My Account
                </button>
              </Link>
              <Link href="/">
                <button className="w-full text-left text-sm px-3 py-2 hover:bg-gray-100 rounded-md transition duration-200 font-medium">
                  Back to Home
                </button>
              </Link>

              <hr className="border-gray-200" />

              <button
                onClick={() => signOut()}
                className="w-full flex items-center justify-between text-left text-sm px-3 py-2 text-red-500 hover:text-red-600 hover:bg-gray-100 rounded-md transition duration-200 font-medium"
              >
                <span>Logout</span>
                <FaSignOutAlt className="text-base" />
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              <Link href="/login">
                <div className="text-sm px-3 py-2 hover:bg-gray-100 rounded-md transition duration-200 cursor-pointer font-medium">
                  Login
                </div>
              </Link>
              <Link href="/register">
                <div className="text-sm px-3 py-2 hover:bg-gray-100 rounded-md transition duration-200 cursor-pointer font-medium">
                  Register
                </div>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
