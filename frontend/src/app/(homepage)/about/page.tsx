import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Teams() {
  return (
    <div className="py-4 bg-white sm:py-8 lg:py-12 font-sans text-gray-700">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl xl:text-5xl">
            Meet The Teams
          </h2>
          <hr className="border-2 my-8 mx-8 border-gray-300" />
          <p className="text-left px-8">
            At Jobsdoors, we believe that job seekers are the foundation of
            innovation and progress. Whether you're a skilled developer, a
            creative designer, or an ambitious entrepreneur, we know that every
            professional brings unique talents and aspirations to the table.
            That&apos;s why we strive to create opportunities that align with
            your goals and empower you to thrive. From refining your skills to
            discovering meaningful career paths, our mission is to ensure that
            every job seeker feels confident, valued, and equipped to succeed.
            With cutting-edge tools, personalized guidance, and a commitment to
            professional growth, Jobsdoors is more than just a job
            portal—it&apos;s a gateway to your future. Join us in building a
            workforce where talent meets opportunity, and let&apos;s shape
            tomorrow together.
          </p>
        </div>

        <div className="grid max-w-6xl grid-cols-1 px-20 mx-auto mt-12 text-center sm:px-0 sm:grid-cols-2 md:mt-20 gap-x-8 md:grid-cols-3 gap-y-12 lg:gap-x-16 xl:gap-x-20">
          <div>
            <Image
              className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 hover:transition hover:scale-105 hover:ease-in hover:duration-300 bg-gray-50"
              src="https://res.cloudinary.com/dyjsmoxmq/image/upload/v1750223549/spk5l3r2e0hdrteqgsbn.png"
              alt="Ikhsan"
              width={176}
              height={176}
            />
            <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8">
              Ikhsan
            </p>
            <p className="mt-2 text-base font-normal text-gray-600">
              Fullstack Web Developer
            </p>
            <div className="flex gap-3 justify-center my-4">
              <Link href="https://www.instagram.com/">
                <FaInstagram className="w-5 h-5 text-pink-500 hover:text-pink-400 hover:cursor-pointer transition duration-200" />
              </Link>
              <Link href="https://www.linkedin.com/in/ikhsanfrcn">
                <FaLinkedinIn className="w-5 h-5 text-white bg-blue-400 p-0.5 hover:bg-blue-300 hover:cursor-pointer transition duration-200" />
              </Link>
            </div>
          </div>

          <div>
            <Image
              className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 hover:transition hover:scale-105 hover:ease-in hover:duration-300 bg-gray-50"
              src="https://res.cloudinary.com/dyjsmoxmq/image/upload/v1750045719/wzptydlcrnhwwyhxc2vv.png"
              alt="Ferdy"
              width={176}
              height={176}
            />
            <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8">
              Ferdy
            </p>
            <p className="mt-2 text-base font-normal text-gray-600">
              Fullstack Web Developer
            </p>
            <div className="flex gap-3 justify-center my-4">
              <Link href="https://www.instagram.com/ferdydjasni">
                <FaInstagram className="w-5 h-5 text-pink-500 hover:text-pink-400 hover:cursor-pointer transition duration-200" />
              </Link>
              <Link href="https://www.linkedin.com/in/ferdydjasni">
                <FaLinkedinIn className="w-5 h-5 text-white bg-blue-400 p-0.5 hover:bg-blue-300 hover:cursor-pointer transition duration-200" />
              </Link>
            </div>
          </div>

          <div>
            <Image
              className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 hover:transition hover:scale-105 hover:ease-in hover:duration-300 bg-gray-50"
              src="https://res.cloudinary.com/dyjsmoxmq/image/upload/v1750232017/ryjag3pnvl941maulu49.png"
              alt="Indro"
              width={176}
              height={176}
            />
            <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8">
              Indro
            </p>
            <p className="mt-2 text-base font-normal text-gray-600">
              Fullstack Web Developer
            </p>
            <div className="flex gap-3 justify-center my-4">
              <Link href="https://www.instagram.com/abrioktariansyah">
                <FaInstagram className="w-5 h-5 text-pink-500 hover:text-pink-400 hover:cursor-pointer transition duration-200" />
              </Link>
              <Link href="https://www.linkedin.com/in/abriokta">
                <FaLinkedinIn className="w-5 h-5 text-white bg-blue-400 p-0.5 hover:bg-blue-300 hover:cursor-pointer transition duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
