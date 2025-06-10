import Link from "next/link";
import { IoCreateOutline } from "react-icons/io5";
import { SiReaddotcv } from "react-icons/si";
import { TbRosetteNumber1 } from "react-icons/tb";

export default function SubscribePlan() {
  return (
    <div>
      <div className="flex flex-col items-center font-sans">
        <h2 className="text-3xl font-semibold tracking-tight">
          Subscribe Plan
        </h2>
        <hr className="w-[50%] my-3 text-gray-300" />
      </div>
      <div className="flex-row md:flex md:gap-3 my-3 w-full h-full">
        <div className="border border-gray-200 shadow-md p-5 rounded-lg w-full md:w-[50%] mt-3">
          <h3 className="text-center text-lg font-semibold tracking-tight">
            Standard Plan
          </h3>
          <hr className="text-gray-300 my-3" />
          <p className="text-sm my-3">
            Get standard subscription
            <br />
            <br />
            Feature :
          </p>
          <div className="flex items-center gap-3">
            <span>
              <SiReaddotcv />
            </span>
            <p className="text-sm my-3">CV Generator</p>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span>
              <IoCreateOutline />
            </span>
            <p className="text-sm">Skill Assessment 2x</p>
          </div>
          <p className="text-sm">&nbsp;</p>
          <div className="flex flex-col items-center justify-center mt-7">
            <p className="text-sm mb-3">only for :</p>
            <p className="text-2xl text-shadow-md px-3 py-2 border border-sky-200 text-green-600 rounded-md tracking-tighter">
              IDR 25.000
            </p>
          </div>
          <Link href={"/subscription"}>
            <button className="border border-gray-300 flex-1 py-3 bg-white rounded-lg text-sm font-medium hover:text-white hover:bg-green-600 transition duration-200 cursor-pointer mt-5 w-full">
              Subscribe now
            </button>
          </Link>
        </div>
        <div className="border border-gray-200 shadow-md p-5 rounded-lg w-full md:w-[50%] mt-3">
          <h3 className="text-center text-lg font-semibold tracking-tight">
            Professional Plan
          </h3>
          <hr className="text-gray-300 my-3" />
          <p className="text-sm my-3">
            Get professional subscription
            <br />
            <br />
            Feature :
          </p>
          <div className="flex items-center gap-3">
            <span>
              <SiReaddotcv />
            </span>
            <p className="text-sm my-3">CV Generator</p>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span>
              <IoCreateOutline />
            </span>
            <p className="text-sm">Unlimited Skill Assessment</p>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <TbRosetteNumber1 />
            </span>
            <p className="text-sm">Priority Review</p>
          </div>
          <div className="flex flex-col items-center justify-center mt-7">
            <p className="text-sm mb-3">only for :</p>
            <p className="text-2xl text-shadow-md px-3 py-2 border border-sky-200 text-green-600 rounded-md tracking-tighter">
              IDR 100.000
            </p>
          </div>
          <Link href={"/subscription"}>
            <button className="border border-gray-300 flex-1 py-3 bg-white rounded-lg text-sm font-medium hover:text-white hover:bg-green-600 transition duration-200 cursor-pointer mt-5 w-full">
              Subscribe now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
