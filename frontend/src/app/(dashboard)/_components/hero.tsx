import Image from "next/image";

interface IProps {
  title: string;
}

export default function Hero({ title }: IProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="w-50">
          <Image
            src="/images/profile/hero.png"
            alt="profile illustration"
            width={160}
            height={128}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
