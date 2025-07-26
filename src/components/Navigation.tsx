import React, { useState } from "react";
import { Menu, X, LogOut, BarChart3 } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { navigationItems } from "../routes";

interface NavigationProps {
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const renderNavItems = (isMobile = false) => (
    <div className="flex flex-col">
      {navigationItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center space-x-3 px-6 py-3 transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  );

  const Logo = () => (
    <div className="flex items-center space-x-3 px-6 py-4">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
        <BarChart3 className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-lg font-bold text-gray-800">FAST FRONT V1</h1>
        <p className="text-sm text-gray-500">Project Generator</p>
      </div>
    </div>
  );

  const LogoutButton = () => (
    <button
      onClick={onLogout}
      className="flex items-center space-x-3 px-6 py-3 text-red-600 hover:bg-red-50 transition-colors w-full"
    >
      <LogOut className="w-5 h-5" />
      <span>Se déconnecter</span>
    </button>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Logo />
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={toggleMobileMenu}
          />
          <nav className="lg:hidden fixed left-0 top-0 h-full w-72 bg-white shadow-lg z-50 overflow-y-auto">
            {renderNavItems(true)}
            <div className="mt-auto border-t border-gray-200">
              <LogoutButton />
            </div>
          </nav>
        </>
      )}

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-md z-30">
        <Logo />
        <div className="flex-1 overflow-y-auto">{renderNavItems()}</div>
        <div className="border-t border-gray-200">
          <LogoutButton />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
