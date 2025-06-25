"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineMenu,
  HiX,
  HiOutlineCog,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import { FaTicketAlt, FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function SidebarMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const role = session?.user?.role;
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const linkClass = (href: string) =>
    `block px-4 py-2 rounded-xl transition duration-300 ${
      pathname === href ? "bg-gray-100 text-black" : "hover:bg-gray-100"
    }`;

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-black text-3xl z-[100] relative"
      >
        {isMenuOpen ? <HiX /> : <HiOutlineMenu />}
      </button>

      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/50 z-[49] backdrop-blur-sm"
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-[50] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <p className="text-sm font-semibold mb-5">Dashboard</p>
          <ul className="space-y-4">
            {role === "company" && (
              <>
                <li>
                  <Link
                    href="/company/profile"
                    className={linkClass("/company/profile")}
                    onClick={toggleMenu}
                  >
                    <FaUser className="inline-block mr-4" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/company/manage-jobs"
                    className={linkClass("/company/manage-jobs")}
                    onClick={toggleMenu}
                  >
                    <FaTicketAlt className="inline-block mr-4" />
                    Manage Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/company/settings"
                    className={linkClass("/company/settings")}
                    onClick={toggleMenu}
                  >
                    <HiOutlineCog className="inline-block mr-4" />
                    Settings
                  </Link>
                </li>
              </>
            )}
            {role === "user" && (
              <>
                <li>
                  <Link
                    href="/user/profile"
                    className={linkClass("/user/profile")}
                    onClick={toggleMenu}
                  >
                    <FaUser className="inline-block mr-4" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/activity"
                    className={linkClass("/user/activity")}
                    onClick={toggleMenu}
                  >
                    <HiOutlineChartBar className="inline-block mr-4" />
                    Job Activity
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/assessments"
                    className={linkClass("/user/assessments")}
                    onClick={toggleMenu}
                  >
                    <HiOutlineCalendar className="inline-block mr-4" />
                    Assessments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/subscribe"
                    className={linkClass("/user/subscribe")}
                    onClick={toggleMenu}
                  >
                    <FaTicketAlt className="inline-block mr-4" />
                    Subscribe
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/badges"
                    className={linkClass("/user/badges")}
                    onClick={toggleMenu}
                  >
                    <HiOutlineBadgeCheck className="inline-block mr-4" />
                    Badges
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/settings"
                    className={linkClass("/user/settings")}
                    onClick={toggleMenu}
                  >
                    <HiOutlineCog className="inline-block mr-4" />
                    Settings
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
