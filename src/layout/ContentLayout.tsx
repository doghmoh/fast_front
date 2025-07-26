import React from "react";
import { Plus } from "lucide-react";

interface ContentLayoutProps {
  title: string;
  subtitle?: string;
  onAdd: () => void;
  addLabel?: string;
  children: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
  title,
  subtitle,
  onAdd,
  addLabel = "Ajouter",
  children,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>{addLabel}</span>
        </button>
      </div>

      {/* Children Content */}
      <div>{children}</div>
    </div>
  );
};

export default ContentLayout;
