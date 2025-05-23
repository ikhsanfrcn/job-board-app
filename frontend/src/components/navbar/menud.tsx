import Link from "next/link";
import { IoLogInOutline } from "react-icons/io5";

export default function MenuDesktop() {
  return (
    <div className="flex gap-1 text-[15px] font-[family-name:var(--font-geist-sans)]">
      <Link
        href="/register"
        className="px-4 py-2 font-bold transition duration-300 hover:text-green-600"
      >
        Register
      </Link>
      <Link
        href="/login"
        className="flex items-center gap-2 text-white bg-black px-4 py-1 rounded-lg font-semibold transition duration-300 hover:bg-green-600"
      >
        <IoLogInOutline className="text-2xl" />Login
      </Link>
    </div>
  );
}