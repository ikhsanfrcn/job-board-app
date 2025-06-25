import SideBar from "./_components/sidebar";
import NavbarMobile from "../_components/navbarMobile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | JobsDoors",
  description: "Where Talent Meets Destiny",
  openGraph: {
    url: "https://res.cloudinary.com/dyjsmoxmq/image/upload/v1750841349/xrlsuwj0odnxzllaxyog.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="xl:px-32">
      <NavbarMobile />
      <div className="w-full flex flex-wrap">
        <div className="hidden md:block w-full md:w-3/12 sticky top-0 h-screen p-4">
          <SideBar />
        </div>
        <div className="w-full md:w-9/12 p-4">
          <div>{children}</div>
        </div>
      </div>
    </main>
  );
}
