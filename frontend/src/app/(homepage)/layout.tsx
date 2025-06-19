
import Footbar from "@/components/footbar/footbar";
import Navbar from "@/components/navbar/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobsDoors",
  description: "Where Talent Meets Destiny",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="max-w-screen">
        <Navbar />
        {children}
        <Footbar />
      </div>
    </main>
  );
}
