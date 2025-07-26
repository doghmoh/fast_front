import React, { useState } from "react";
import { useCrud } from "../../hooks/customQuery";

interface Props {
  entityName: string;
  item?: any;
  onClose: () => void;
}

const EntityForm: React.FC<Props> = ({ entityName, item, onClose }) => {
  const isEdit = !!item;

  const { useCreate, useUpdate } = useCrud({
    baseUrl: `/${entityName}`,
    queryKey: entityName,
  });

  const create = useCreate();
  const update = useUpdate();

  const [formData, setFormData] = useState({
    name: item?.name || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      update.mutate({ id: item._id, ...formData });
    } else {
      create.mutate({ ...formData, id: undefined });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h2 className="text-xl font-bold mb-2">
        {isEdit ? "Modifier" : "Ajouter"} un élément
      </h2>

      <div>
        <label className="block mb-1 font-medium">Nom</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {isEdit ? "Modifier" : "Créer"}
        </button>
      </div>
    </form>
  );
};

export default EntityForm;
