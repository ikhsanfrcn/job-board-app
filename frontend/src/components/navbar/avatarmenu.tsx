import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AvatarMenu() {
  const { data: session } = useSession();

  return (
    <div className="font-sans">
      <div className="block text-sm px-2 pb-2">
        Hi, welcome Back
        <br />
        <span className="text-green-600">{session?.user.username}</span>
      </div>
      <hr className="text-gray-300 pb-2" />
      <Link
        href={"/user/profile"}
        className="block w-full py-2 px-2 mb-2 text-sm text-gray-800 hover:bg-gray-200 transition duration-300"
      >
        Profile
      </Link>
    </div>
  );
}
