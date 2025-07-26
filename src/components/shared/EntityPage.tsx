import React, { useState } from "react";
import EntityForm from "./EntityForm";
import EntityTable from "./EntityTable";
import ContentLayout from "../../layout/ContentLayout";

const EntityPage = ({ entityName }: { entityName: string }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    setSelectedItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  return (
    <>
      <ContentLayout
        title={`Gestion des ${entityName}`}
        subtitle={`Liste des ${entityName}`}
        onAdd={handleAdd}
        addLabel="Ajouter"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <EntityTable
          entityName={entityName}
          searchTerm={searchTerm}
          onEdit={handleEdit}
        />
      </ContentLayout>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <EntityForm
              entityName={entityName}
              item={selectedItem}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EntityPage;
