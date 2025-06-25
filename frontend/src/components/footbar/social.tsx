import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialShare() {
  return (
    <div className="w-full flex justify-center my-10 overflow-auto">
      <ul className="flex items-center space-x-5 text-2xl">
        <li>
            <Link
            href="https://www.facebook.com/sharer/sharer.php?u=https://jobsdoors.vercel.app"
            className="flex items-center justify-center border transition-all duration-200 rounded-full w-10 h-10 hover:bg-blue-500 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
            >
            <FaFacebookF />
            </Link>
        </li>
        <li>
          <Link
            href="https://www.twitter.com/intent/tweet?url=https://jobsdoors.vercel.app"
            className="flex items-center justify-center border transition-all duration-200 rounded-full w-10 h-10 hover:bg-blue-400 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </Link>
        </li>
        <li>
          <Link
            href="https://wa.me/?text=https://jobsdoors.vercel.app"
            className="flex items-center justify-center border transition-all duration-200 rounded-full w-10 h-10 hover:bg-green-600 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://jobsdoors.vercel.app"
            className="flex items-center justify-center border transition-all duration-200 rounded-full w-10 h-10 hover:bg-blue-500 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </Link>
        </li>
      </ul>
    </div>
  );
}
