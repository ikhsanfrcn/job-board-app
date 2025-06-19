import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <Image
        src={"/walk.gif"}
        height={500}
        width={500}
        alt="walk-loading"
        className="w-auto h-auto"
      />
      <Image
        src="/logo.svg"
        height={300}
        width={350}
        alt="logo-loading"
        className="animate-pulse -mt-5"
      />
    </div>
  );
}
