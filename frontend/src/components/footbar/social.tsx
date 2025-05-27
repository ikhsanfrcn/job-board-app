import Link from "next/link";
import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialShare() {
  return (
    <div className="w-full flex justify-center my-10 overflow-auto">
      <ul className="flex items-center space-x-5 text-2xl">
        <li>
          <Link
            href="/"
            className="flex items-center justify-center border transition-all duration-200 rounded-full w-10 h-10 hover:bg-blue-500 hover:text-white"
          >
            <FaFacebookF />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center justify-center border transition-all duration-200 rounded-full w-10 h-10 hover:bg-blue-400 hover:text-white"
          >
            <FaXTwitter />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center justify-center border transition-all duration-200 rounded-full w-10 h-10 hover:bg-red-500 hover:text-white"
          >
            <FaYoutube />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center justify-center border transition-all duration-200 rounded-full w-10 h-10 hover:bg-pink-400 hover:text-white"
          >
            <FaInstagram />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center justify-center border transition-all duration-200 rounded-full w-10 h-10 hover:bg-black hover:text-white"
          >
            <FaGithub />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center justify-center border transition-all duration-200 rounded-full w-10 h-10 hover:bg-blue-700 hover:text-white"
          >
            <FaDiscord />
          </Link>
        </li>
      </ul>
    </div>
  );
}
