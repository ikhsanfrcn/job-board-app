"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

function AnimatedCounter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const springCount = useSpring(count, { bounce: 0, duration: 2000 });
  const rounded = useTransform(
    springCount,
    (latest) => Math.round(latest) + suffix
  );

  useEffect(() => {
    count.set(value);
  }, [value, count]);

  return (
    <div className="text-center text-3xl font-bold">
      <motion.span>{rounded}</motion.span>
      <p className="text-sm">{label}</p>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="w-screen h-screen font-sans">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
        }}
      />
      <div className="flex flex-col justify-center items-center w-full mt-20 md:mt-0 p-4 h-fit md:h-full text-center text-shadow-lg z-10">
        <h2 className="text-5xl md:text-6xl font-bold my-3 text-sky-500">
          Empowering Careers
        </h2>
        <h3 className="text-6xl md:text-7xl font-bold my-3 text-green-600">
          Connecting Ambitions
        </h3>
        <p className="text-2xl md:text-3xl my-3">Unlock your next big move</p>
        <p className="text-xl md:text-2xl">Find talent or discover your dream role</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 w-full mt-10 md:mt-20 gap-y-10 px-0 md:px-10 lg:px-20">
          <AnimatedCounter value={10000} suffix="+" label="CV Generating" />
          <AnimatedCounter value={100000} suffix="+" label="Hired Talents" />
          <AnimatedCounter value={999} suffix="+" label="Global Companies" />
          <AnimatedCounter value={90} suffix="%" label="Hiring Response Rate" />
        </div>
      </div>
    </div>
  );
}