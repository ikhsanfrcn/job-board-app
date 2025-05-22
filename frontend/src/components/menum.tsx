import Link from "next/link";

export default function MenuMobile(){
    return(
        <div>
            <div className="block px-3 pt-2 text-lg text-shadow-sm font-bold text-gray-800">
                Login to your account
              </div>
              <div className="block px-3 pb-8 text-md text-shadow-sm text-gray-800">
                to access all features on HoopPass
              </div>
              <div className="flex justify-evenly gap-3">
                <Link
                  href="/register"
                  className="w-[50%] text-center text-gray-800 border-2 px-4 py-2 rounded-lg font-bold transition duration-300 shadow-md text-shadow-sm hover:text-orange-500 hover:bg-gray-800 hover:border-gray-300"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="w-[50%] text-center text-orange-500 bg-black px-4 py-2 rounded-lg font-bold transition duration-300 border-2 shadow-md text-shadow-sm hover:bg-gray-800 hover:border-gray-300"
                >
                  Login
                </Link>
              </div>
              <hr className="my-8 text-gray-600" />
              <Link
                href="/match"
                className="block text-gray-800 px-4 rounded-lg font-semibold transition duration-300 text-shadow-sm hover:text-white hover:text-shadow-gray-800"
              >
                Create a match as Organizer
              </Link>
              <Link
                href="/dismatch"
                className="block text-gray-800 px-4 py-2 rounded-lg font-semibold transition duration-300 text-shadow-sm hover:text-white hover:text-shadow-gray-800"
              >
                Discover basketball Match
              </Link>
        </div>
    )
}