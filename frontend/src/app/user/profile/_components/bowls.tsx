import { IoIosArrowRoundForward } from "react-icons/io";

export default function Bowls() {
  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="w-full p-6">
          <h2 className="text-xl font-semibold">Bowls for you</h2>
          <p className="text-sm text-green-700 font-semibold flex items-center">
            Explore all Bowls
            <IoIosArrowRoundForward className="text-3xl" />
          </p>

          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
