"use client";

import React, { useState } from "react";
import {
  LuLayoutDashboard,
  LuChevronDown,
  LuChevronRight,
} from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { FaMoneyCheckDollar, FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineCategory, MdOutlinePayments } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { CiViewList } from "react-icons/ci";
import Link from "next/link";
import { PiSignOutBold } from "react-icons/pi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
  onNavigate?: (page: string) => void;
}

export default function Sidebar({
  className,
  isCollapsed = false,
  onToggle,
  onNavigate,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "dashboards",
    "subscription",
    "skill-assessment",
  ]);
  const menuItems: MenuItem[] = [
    {
      id: "dashboards",
      label: "Dashboards",
      icon: LuLayoutDashboard,
      children: [
        {
          id: "analytics",
          label: "Analytics",
          icon: IoBarChartOutline,
          href: "/dev/dashboard/analytics",
        },
      ],
    },
    {
      id: "subscription",
      label: "Subscription",
      icon: FaMoneyCheckDollar,
      children: [
        {
          id: "category",
          label: "Category",
          icon: MdOutlineCategory,
          href: "/dev/dashboard/category",
        },
        {
          id: "payment",
          label: "Payment",
          icon: MdOutlinePayments,
          href: "/dev/dashboard/payment",
        },
      ],
    },
    {
      id: "skill-assessment",
      label: "Skill Assessment",
      icon: FaRegPenToSquare,
      children: [
        {
          id: "assessment",
          label: "Assessment",
          icon: CiViewList,
          href: "/dev/dashboard/assessment",
        },
        {
          id: "create-assessment",
          label: "Create Assessment",
          icon: TbUserQuestion,
          href: "/dev/dashboard/createassessment",
        },
      ],
    },
  ];
  const toggleSidebar = () => {
    if (onToggle) {
      onToggle();
    }
  };
  const toggleExpanded = (itemId: string) => {
    if (isCollapsed) return;
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };
  const handleMenuItemClick = (item: MenuItem, hasChildren: boolean) => {
    // Handle navigation for items with href
    if (!hasChildren && item.href && onNavigate) {
      onNavigate(item.href);
    }
    // Auto-collapse on mobile when clicking menu items
    if (window.innerWidth < 768 && onToggle && !hasChildren) {
      setTimeout(() => onToggle(), 150); // Small delay for better UX
    }
    // Handle expansion for parent items
    if (!isCollapsed && hasChildren) {
      toggleExpanded(item.id);
    }
  };
  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const Icon = item.icon;

    return (
      <div key={item.id} className="relative w-full group">
        {hasChildren ? (
          <div
            className={`
              relative flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:text-sky-500 rounded-lg cursor-pointer transition-colors duration-200
              ${level > 0 ? "ml-2" : ""}
              ${level > 1 ? "ml-4" : ""}
            `}
            onClick={() => handleMenuItemClick(item, !!hasChildren)}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {/* Label - with smooth width transition */}
            {!isCollapsed && (
              <div className="ml-3 overflow-hidden transition-all duration-300 ease-in-out">
                <span className="whitespace-nowrap transition-opacity duration-300">
                  {item.label}
                </span>
              </div>
            )}
            {/* Expand/Collapse arrow - with smooth transition */}
            {hasChildren && !isCollapsed && (
              <div className="ml-auto transition-all duration-300 ease-in-out">
                <div className={`transform transition-transform duration-300`}>
                  {isExpanded ? (
                    <LuChevronDown className="w-4 h-4 transition-transform duration-300" />
                  ) : (
                    <LuChevronRight className="w-4 h-4 transition-transform duration-300" />
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            href={item.href as string}
            className={`
              relative flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:text-sky-500 rounded-lg cursor-pointer transition-colors duration-200
              ${level > 0 ? "ml-2" : ""}
              ${level > 1 ? "ml-4" : ""}
            `}
            onClick={() => handleMenuItemClick(item, !!hasChildren)}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {/* Label - with smooth width transition */}
            {!isCollapsed && (
              <div className="ml-3 overflow-hidden transition-all duration-300 ease-in-out">
                <span className="whitespace-nowrap transition-opacity duration-300">
                  {item.label}
                </span>
              </div>
            )}
          </Link>
        )}
        {/* Children - with smooth slide down animation */}
        {!isCollapsed && (
          <div
            className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${
              hasChildren && isExpanded
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
          >
            <div className="mt-1 space-y-1 transform transition-transform duration-300">
              {item.children?.map((child) => renderMenuItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`relative bg-white border-r border-gray-200 h-screen overflow-y-auto transition-all duration-300 ease-in-out`}
    >
      {/* Header - Clickable to toggle sidebar */}
      <div
        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={toggleSidebar}
      >
        <div className="flex items-center justify-center relative group">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300">
            <LuLayoutDashboard className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden transition-all duration-300 ease-in-out">
              <span className="font-semibold text-gray-800 whitespace-nowrap transition-opacity duration-300">
                &nbsp;DASHBOARD MENU
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Menu Items */}
      <div className="p-4 space-y-2">
        {menuItems.map((item) => renderMenuItem(item))}
        <div
          className={`
            flex items-center mt-10 gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200
            text-gray-600 hover:text-sky-500
            ${isCollapsed ? "justify-center" : ""}
          `}
        >
          <PiSignOutBold className="text-xl flex-shrink-0" />
          {!isCollapsed && (
            <button
              className="text-sm hover:text-sky-500 text-gray-700 cursor-pointer w-full text-left"
              onClick={async () => {
                await signOut({ redirect: false });
                redirect("/dev/login");
              }}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
