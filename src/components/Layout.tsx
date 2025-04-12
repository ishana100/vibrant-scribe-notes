
import React from "react";
import Sidebar from "./Sidebar";
import { useApp } from "@/context/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMenuOpen, toggleMenu } = useApp();
  const isMobile = useIsMobile();

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar/Menu */}
      <div
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 w-64 transform ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`
            : "w-64 border-r border-border"
        } bg-background`}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile menu */}
      {isMobile && isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
          onClick={toggleMenu}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Layout;
