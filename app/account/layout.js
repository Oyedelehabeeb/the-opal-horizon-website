"use client";

import SideNavigation from "../_components/SideNavigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Layout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-100 p-2 rounded-md shadow"
        onClick={toggleMobileSidebar}
      >
        {isMobileSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        md:hidden
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <SideNavigation />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white border-r">
        <SideNavigation />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-6 lg:p-8">{children}</main>

      {/* Overlay for Mobile */}
      {isMobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggleMobileSidebar}
        />
      )}
    </div>
  );
}
