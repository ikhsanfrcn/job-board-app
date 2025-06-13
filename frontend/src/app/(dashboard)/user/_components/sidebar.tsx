"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import UpdateAvatarModal from "./updateAvatarModal";
import { FaAward } from "react-icons/fa6";

export default function SideBar() {
  const { data: user } = useSession();
  const token = user?.accessToken;
  const pathname = usePathname();
  const [avatar, setAvatar] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [badge, setBadge] = useState<any[]>([]);
  const [showAllBadges, setShowAllBadges] = useState(false);

  const menuItems = [
    { label: "Profile", path: "/user/profile" },
    { label: "Job Preferences", path: "/user/preferences" },
    { label: "Job Activity", path: "/user/activity" },
    { label: "Assessment History", path: "/user/assessments" },
    { label: "Following", path: "/user/following" },
    { label: "Notifications", path: "/user/notifications" },
    { label: "Subscribe", path: "/user/subscribe" },
    { label: "Badges", path: "/user/badges" },
  ];

  const isActive = (path: string) =>
    pathname === path ? "border-gray-300 font-semibold" : "border-white";

  const fetchAvatar = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await axios.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvatar(data.user.avatar);
      const { data: badgeData } = await axios.get("/assessment/user-badges", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBadge(Array.isArray(badgeData.badges) ? badgeData.badges : []);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const handleUpdateAvatar = async () => {
    if (!selectedFile || !token) return;
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const { data } = await axios.patch("/users/update-avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAvatar(data.secure_url);
      setSelectedFile(null);
      setIsModalOpen(false);
      toast.success("Avatar updated successfully");
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        console.log("Error Response:", err.response);
        toast.error(err.response?.data?.message || "Failed to update avatar");
      }
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [fetchAvatar]);
  return (
    <aside>
      <div className="hidden md:block">
        <div className="w-full">
          <div
            className="relative w-25 h-25 border border-gray-200 rounded-full mb-3 overflow-hidden cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
          >
            {avatar ? (
              <Image
                src={avatar}
                alt="avatar"
                width={100}
                height={100}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
            <div className="absolute bottom-4 right-4 bg-white p-1 rounded-full shadow-md group-hover:scale-110 transition-transform">
              <FiEdit className="text-gray-600 text-sm" />
            </div>
          </div>{" "}
          {badge && badge.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <FaAward className="text-[#F0D27F] text-lg" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Earned Badges ({badge.length})
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-2 space-y-2 mb-2 justify-items-center">
                {(showAllBadges ? badge : badge.slice(0, 3)).map((b: any) => (
                  <div
                    key={b.templateId}
                    className="relative group cursor-pointer"
                    title={`${b.title} - ${b.category}`}
                  >
                    <div className="w-7 h-7 overflow-hidden">
                      {b.badgeImage ? (
                        <Image
                          src={b.badgeImage}
                          alt={b.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "No Badge Earned!"
                      )}
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-sky-100/95 text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-all z-10 whitespace-nowrap duration-500">
                      <div className="font-semibold">{b.title}</div>
                      <div className="text-gray-700">{b.category}</div>
                      <div className="text-gray-700">
                        Score: {b.score}/{b.totalPoints}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {badge.length > 3 && (
                <button
                  onClick={() => setShowAllBadges(!showAllBadges)}
                  className="text-xs hover:font-semibold hover:underline cursor-pointer"
                >
                  {showAllBadges
                    ? "Show Less"
                    : `View All ${badge.length} Badges`}
                </button>
              )}
            </div>
          )}
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
            <button
              className="text-sm hover:underline"
              onClick={() => signOut()}
            >
              Signout
            </button>
            <HiOutlineLogout className="text-2xl" />
          </div>
          <Link href="/help">
            <button className="w-full font-medium px-4 py-2 border rounded-lg cursor-pointer">
              Help Center
            </button>
          </Link>
          <Link href="/">
            <button className="mt-4 w-full font-medium px-4 py-2 border rounded-lg cursor-pointer">
              Back to home
            </button>
          </Link>
        </div>
      </div>
      <UpdateAvatarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        onUpload={handleUpdateAvatar}
      />
    </aside>
  );
}
