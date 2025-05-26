
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
      <div>
        <Navbar />
        {children}
      </div>
    </main>
  );
}
