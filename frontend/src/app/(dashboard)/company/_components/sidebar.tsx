"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";
import Image from "next/image";
import UpdateLogoModal from "./updateLogoModal";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function SideBar() {
  const { data: company } = useSession();
  const token = company?.accessToken;

  const pathname = usePathname();
  const [logo, setLogo] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const menuItems = [
    { label: "Profile", path: "/company/profile" },
    { label: "Manage Jobs", path: "/company/manage-jobs" },
    { label: "Account Settings", path: "/company/settings" },
    { label: "Notifications", path: "/company/notifications" },
  ];

  const isActive = (path: string) =>
    pathname === path ? "border-gray-300 font-semibold" : "border-white";

  const fetchLogo = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await axios.get("/company/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogo(data.profile.logo);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const handleUpdateLogo = async () => {
    if (!selectedFile || !token) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const { data } = await axios.patch("/company/update-logo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setLogo(data.secure_url);
      setSelectedFile(null);
      setIsModalOpen(false);
      toast.success("Logo updated successfully");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("Error Response:", err.response);
        toast.error(err.response?.data?.message || "Logo update failed !");
      }
    }
  };

  useEffect(() => {
    fetchLogo();
  }, [fetchLogo]);

  return (
    <>
      <div className="hidden md:block">
        <div className="w-full">
          <div
            className="relative w-25 h-25 border border-gray-200 rounded-full mb-5 overflow-hidden cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
          >
            {logo ? (
              <Image
                src={logo}
                alt="logo"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
            <div className="absolute bottom-4 right-4 bg-white p-1 rounded-full shadow-md group-hover:scale-110 transition-transform">
              <FiEdit className="text-gray-600 text-sm" />
            </div>
          </div>

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

      <UpdateLogoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        onUpload={handleUpdateLogo}
      />
    </>
  );
}
