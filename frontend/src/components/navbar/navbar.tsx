"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CgCloseR, CgMenu, CgSearch } from "react-icons/cg";
import MenuDesktop from "./menud";
import MenuMobile from "./menum";
import { useRouter, useSearchParams } from "next/navigation";
import MiddleMenu from "./middlemenu";
import { IoLogInOutline } from "react-icons/io5";
import MiddleMenuMobile from "./middlemenum";
import AvatarMenu from "./avatarmenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const toggleMenuSearch = () => setIsOpenSearch(!isOpenSearch);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("title") || "");
  const toggleMenu = () => setIsOpen(!isOpen);
  const { data: session } = useSession();
  const isLogin = !!session;
  const router = useRouter();
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/job?title=${searchQuery}`);
    }
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm w-full z-50 font-sans ">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="text-xl font-bold text-gray-800">
              <Image
                src="/logo.svg"
                width={200}
                height={100}
                alt="jobsdoors-logo"
                className="w-auto h-auto"
                priority
              />
            </Link>
          </div>
          {/* Desktop Menu */}
          <MiddleMenu />
          <div className="hidden lg:flex items-center">
            {!isLogin ? (
              <MenuDesktop />
            ) : (
              <>
                {isOpenSearch && (
                  <div className="flex items-center text-black">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      placeholder="Search for jobs"
                      className="px-3 py-2 rounded-2xl bg-gray-200"
                    />
                  </div>
                )}
                <button
                  onClick={toggleMenuSearch}
                  className="font-bold cursor-pointer mx-4"
                >
                  {isOpenSearch ? (
                    <CgCloseR size={24} />
                  ) : (
                    <div className="flex items-center group hover:bg-gray-300 h-10 rounded-3xl px-3 transition-all duration-300">
                      <CgSearch
                        size={24}
                        className="group-hover:rotate-[15deg] transition duration-200 z-10"
                      />
                      <span className="text-sm font-medium ml-2">Search</span>
                      <span className="absolute bg-green-500 w-2 h-2 rounded-full top-4.5 right-38.5 opacity-0 scale-50 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-[-100%] group-hover:translate-y-[100%]">
                        &nbsp;
                      </span>
                    </div>
                  )}
                </button>
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center gap-3 cursor-pointer w-full"
                  >
                    <div>
                      <Image
                        src={
                          session.user.avatar ||
                          "https://res.cloudinary.com/dexlqslwj/image/upload/v1744257672/blank-image_yfczs3_ogl5pp.jpg"
                        }
                        height={40}
                        width={40}
                        alt="avatar"
                        className="rounded-full"
                      />
                    </div>
                  </button>
                  {/* Avatar Menu */}
                  {isOpen && (
                    <div
                      className="absolute right-0 top-13 w-48 bg-white shadow-sm font-semibold px-2 py-3"
                      onClick={toggleMenu}
                    >
                      {session.user && <AvatarMenu />}
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center justify-between w-full px-2 py-2 text-sm hover:bg-gray-200 cursor-pointer text-left "
                      >
                        Sign Out
                        <IoLogInOutline className="text-2xl" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {/* Burger Icon */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-black font-bold cursor-pointer"
            >
              {isOpen ? (
                <div className="hover:bg-gray-200 p-3 rounded-full transition duration-300">
                  <CgCloseR size={24} />
                </div>
              ) : (
                <div className="hover:bg-gray-200 p-3 rounded-full transition duration-300">
                  <CgMenu size={24} />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="lg:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow-sm border-t"
          onClick={toggleMenu}
        >
          {!isLogin ? (
            <MenuMobile />
          ) : (
            <div className="w-full py-1 font-semibold text-center">
              <div className="flex flex-col items-center">
                <Image
                  src={
                    session.user.avatar ||
                    "https://res.cloudinary.com/dexlqslwj/image/upload/v1744257672/blank-image_yfczs3_ogl5pp.jpg"
                  }
                  height={100}
                  width={100}
                  alt="avatar"
                  className="rounded-full"
                />
              </div>
              <div className="text-gray-800 font-medium text-sm py-2">
                <div>{session.user?.username}</div>
                <div>{session.user.email}</div>
              </div>
              <hr className="my-2 text-gray-300" />
              {session.user && (
                <Link
                  href={"/user/profile"}
                  className="block w-full px-4 py-2 text-sm hover:bg-gray-200 transition duration-300"
                >
                  Profile
                </Link>
              )}
              <hr className="my-2 text-gray-300" />
              <MiddleMenuMobile />
              <hr className="my-2 text-gray-300" />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
