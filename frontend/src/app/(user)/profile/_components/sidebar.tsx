import { HiOutlineLogout } from "react-icons/hi";

export default function SideBar() {
  return (
    <div className="w-full">
      <div className="w-25 h-25 rounded-full bg-gray-200 mb-5"></div>
      <hr className="w-full border-1 border-gray-200 mb-5" />
      <div className="w-full flex flex-col items-start gap-2 text-sm">
        <button className="px-4 py-2 border-l-4 border-white hover:border-l-4 hover:border-gray-300 hover:font-semibold">
          Profile
        </button>
        <button className="px-4 py-2 border-l-4 border-white hover:border-l-4 hover:border-gray-300 hover:font-semibold">
          Job Preferences
        </button>
        <button className="px-4 py-2 border-l-4 border-white hover:border-l-4 hover:border-gray-300 hover:font-semibold">
          Job Activity
        </button>
        <button className="px-4 py-2 border-l-4 border-white hover:border-l-4 hover:border-gray-300 hover:font-semibold">
          Following
        </button>
        <button className="px-4 py-2 border-l-4 border-white hover:border-l-4 hover:border-gray-300 hover:font-semibold">
          Contributions
        </button>
        <button className="px-4 py-2 border-l-4 border-white hover:border-l-4 hover:border-gray-300 hover:font-semibold">
          Account Settings
        </button>
        <button className="px-4 py-2 border-l-4 border-white hover:border-l-4 hover:border-gray-300 hover:font-semibold">
          Notifications
        </button>
      </div>
      <hr className="w-full border-1 border-gray-200 mt-5" />
      <div className="w-full flex items-center justify-between px-4 py-2 my-2">
        <button className="hover:underline">Signout</button>
        <HiOutlineLogout className="text-2xl" />
      </div>
      <button className="w-full font-medium px-4 py-2 border-1 rounded-lg">
        Help Center
      </button>
    </div>
  );
}
