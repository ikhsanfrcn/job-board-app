"use client"

import Sidebar from "./_components/sidebar";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 768);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <main>
      <div className="max-w-screen flex">
        <div
          className={`${
            isSidebarCollapsed ? "w-18" : "w-64"
          } flex-shrink-0 transition-all duration-300 ease-in-out`}
        >
          <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        </div>
        <div className="w-full">
        {children}
        </div>
      </div>
    </main>
  );
}
