import React from "react";
import { useCrud } from "../../hooks/customQuery";

interface Props {
  entityName: string;
  onEdit: (item: any) => void;
  searchTerm: string;
}

const EntityTable: React.FC<Props> = ({ entityName, onEdit, searchTerm }) => {
  const { useGetAll, useDelete } = useCrud({
    baseUrl: `/${entityName}`,
    queryKey: entityName,
  });

  const { data, isLoading } = useGetAll();
  const del = useDelete();

  const filtered = data?.filter((item: any) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Nom</th>
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered?.map((item: any) => (
            <tr key={item._id} className="border-t">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Modifier
                </button>
                <button
                  onClick={() => del.mutate(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntityTable;
