"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CgCloseR, CgMenuLeft, CgSearch } from "react-icons/cg";
import MenuDesktop from "./menud";
import MenuMobile from "./menum";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const toggleMenuSearch = () => setIsOpenSearch(!isOpenSearch);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleMenu = () => setIsOpen(!isOpen);
  const { data: session } = useSession();
  const isLogin = !!session;
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/dismatch?search=${searchQuery}`);
    }
  };
  return (
    <nav className="fixed top-0 bg-white shadow-sm w-screen z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="text-xl font-bold text-gray-800">
              <Image
                src="/logo.svg"
                width={250}
                height={100}
                alt="hooppass-logo"
                className="w-auto h-auto"
                priority
              />
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-4 items-center">
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search for matches..."
                className="px-4 py-2 rounded-sm bg-gray-200 mr-4"
              />

              <button
                onClick={handleSearch}
                className="bg-orange-500 text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-orange-400"
              >
                Search
              </button>
            </div>
            <Link
              href="/match"
              className="text-gray-800 pl-2 py-2 rounded-lg font-semibold transition duration-300 text-shadow-sm hover:text-white hover:text-shadow-gray-800"
            >
              Create Match
            </Link>
            <Link
              href="/dismatch"
              className="text-gray-800 px-2 py-2 rounded-lg font-semibold transition duration-300 text-shadow-sm hover:text-white hover:text-shadow-gray-800"
            >
              Discover Match
            </Link>
          </div>
          <div className="hidden lg:flex items-center">
            {!isLogin ? (
              <MenuDesktop />
            ) : (
              <>
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
                    <div className="text-gray-800 font-medium text-left text-sm">
                      <div>{session.user.username}</div>
                      <div>{session.user.email}</div>
                    </div>
                  </button>
                  {/* Avatar Menu */}
                  {isOpen && (
                    <div
                      className="absolute right-0 top-13 w-full bg-gradient-to-br from-orange-300 to-orange-400 rounded-b-md shadow-lg py-1 font-semibold text-center"
                      onClick={toggleMenu}
                    >
                      {session.user && (
                        <Link
                          href={`/profile/${session.user.username}`}
                          className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 transition duration-300"
                        >
                          Profile
                        </Link>
                      )}
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="block w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-300 cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {/* Burger Icon */}
          <div className="lg:hidden flex items-center px-7">
            {isOpenSearch && (
              <div className="flex items-center mr-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Search for matches..."
                  className="px-4 py-2 rounded-sm bg-gray-200 mr-4"
                />

                <button
                  onClick={handleSearch}
                  className="bg-orange-500 text-white px-4 py-2 rounded-sm hover:bg-orange-400"
                >
                  Search
                </button>
              </div>
            )}
            <button
              onClick={toggleMenuSearch}
              className="text-white font-bold cursor-pointer mx-4"
            >
              {isOpenSearch ? <CgCloseR size={24} /> : <CgSearch size={24} />}
            </button>
            <button
              onClick={toggleMenu}
              className="text-black font-bold cursor-pointer"
            >
              {isOpen ? <CgCloseR size={24} /> : <CgMenuLeft size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="lg:hidden px-2 pt-2 pb-3 space-y-1 bg-gradient-to-br from-orange-200 to-orange-400 shadow-lg border-t"
          onClick={toggleMenu}
        >
          {!isLogin ? (
            <MenuMobile />
          ) : (
            <div className="w-full py-1 font-semibold text-center text-shadow-md">
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
              <hr className="my-2 text-gray-600" />
              {session.user && (
                <Link
                  href={`/profile/${session.user.username}`}
                  className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 transition duration-300"
                >
                  Profile
                </Link>
              )}
              <hr className="my-2 text-gray-600" />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-300 cursor-pointer"
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