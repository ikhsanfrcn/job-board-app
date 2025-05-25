"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";

export default function SideBar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Profile", path: "/company/profile" },
    { label: "Manage Jobs", path: "/company/manage-jobs" },
    { label: "Account Settings", path: "/company/settings" },
    { label: "Notifications", path: "/company/notifications" },
  ];

  const isActive = (path: string) =>
    pathname === path ? "border-gray-300 font-semibold" : "border-white";

  return (
    <div className="hidden md:block">
      <div className="w-full">
        <div className="w-25 h-25 rounded-full bg-gray-200 mb-5"></div>
        <hr className="w-full border border-gray-200 mb-5" />

        <div className="w-full flex flex-col items-start gap-2 text-sm">
          {menuItems.map((item) => (
            <Link href={item.path} key={item.path}>
              <div
                className={`px-4 py-2 border-l-4 ${isActive(
                  item.path
                )} hover:border-gray-300 hover:font-semibold cursor-pointer`}
              >
                {item.label}
              </div>
            </Link>
          ))}
        </div>

        <hr className="w-full border border-gray-200 mt-5" />
        <div className="w-full flex items-center justify-between px-4 py-2 my-2">
          <button className="hover:underline" onClick={() => signOut()}>
            Signout
          </button>
          <HiOutlineLogout className="text-2xl" />
        </div>

        <Link href="/help">
          <button className="w-full font-medium px-4 py-2 border rounded-lg">
            Help Center
          </button>
        </Link>
      </div>
    </div>
  );
}
