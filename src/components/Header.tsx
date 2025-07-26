import React from "react";
import { Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Bienvenue 👋</h1>
        <p className="text-sm text-gray-500">
          Bon retour, {user?.name || "Utilisateur"} !
        </p>
      </div>
      <div className="flex items-center space-x-4">
        {/* Optional: Profile Picture */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
