"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function ProfileMobile() {
  const { data: session } = useSession();
  console.log(session);
  const email = session?.user?.email;
  const username = session?.user?.username;
  const avatar = session?.user?.avatar as string;
  const role = session?.user?.role;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>
      <div
        className="w-10 h-10 overflow-hidden rounded-full"
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
        <div className="w-64 absolute bg-white text-black p-3 border-2 border-gray-300 rounded shadow-lg mt-4">
          {email ? (
            <div>
              <div className="text-black hover:text-gray-800 font-semibold w-full text-left px-2 py-1 rounded-md hover:bg-gray-100 hover:scale-105 transition duration-300 cursor-pointer mb-2">
                <p className="text-lg font-bold">{username}</p>
                <p className="text-sm">{email}</p>
              </div>
              <div className="border-t border-gray-300 my-2" />
              <Link
                href={role === "company" ? "/company/profile" : "/user/profile"}
              >
                <button className="text-black hover:text-gray-800 font-semibold w-full text-left px-2 py-1 rounded-md hover:bg-gray-100 hover:scale-105 transition duration-300 cursor-pointer mb-2">
                  My Account
                </button>
              </Link>
              <Link href="/">
                <button className="text-black hover:text-gray-800 font-semibold w-full text-left px-2 py-1 rounded-md hover:bg-gray-100 hover:scale-105 transition duration-300 cursor-pointer mb-2">
                  Back to Home
                </button>
              </Link>
              <div className="border-t border-gray-300 my-2" />
              <button
                className="w-full text-left px-2 py-1 flex flex-row items-center justify-between text-red-500 hover:text-red-700 font-semibold rounded-md hover:bg-gray-100 hover:scale-105 transition duration-300 cursor-pointer"
                onClick={() => signOut()}
              >
                <p>Logout</p>
                <FaSignOutAlt className="text-xl" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <Link
                href="/login"
                className="text-black hover:text-gray-800 font-semibold w-full text-left px-2 py-1 rounded-md hover:bg-gray-100 hover:scale-105 transition duration-300 cursor-pointer mb-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-black hover:text-gray-800 font-semibold w-full text-left px-2 py-1 rounded-md hover:bg-gray-100 hover:scale-105 transition duration-300 cursor-pointer mb-2"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
