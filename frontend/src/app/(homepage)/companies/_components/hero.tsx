import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full p-4 lg:px-20 bg-green-50">
      <div className="w-full flex items-center justify-around flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="w-full h-full overflow-hidden">
            <Image
              src="/images/companies/hero.png"
              alt="hero"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:pr-40">
          <h2 className="text-2xl font-semibold mb-3">
            Find a workplace that works for you{" "}
            <span className="bg-green-200 text-xs p-1">NEW</span>
          </h2>
          <p className="mb-3">
            Discover what an employer is really like before you make your next
            move. Search reviews and ratings, and filter companies based on the
            qualities that matter most to your job search.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 text-white bg-black rounded-md">
              Work/life balance
            </button>
            <button className="px-4 py-2 text-white bg-black rounded-md">
              Diversity & inclusion
            </button>
            <button className="px-4 py-2 text-white bg-black rounded-md">
              Compensation and benefits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
