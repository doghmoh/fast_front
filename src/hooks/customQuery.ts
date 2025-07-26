import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { CreateOptions, UseCrudOptions } from "../interfaces/crudInterface";

export function useCrud<T extends { id: string | number }>({
  baseUrl,
  queryKey,
  enabled = true,
}: UseCrudOptions<T>) {
  const queryClient = useQueryClient();

  // Get All
  const useGetAll = (options?: { params?: Record<string, any> }) =>
    useQuery({
      queryKey: [queryKey, options?.params], // ensure query is refetched when params change
      queryFn: async () => {
        const { data } = await axiosInstance.get<T[]>(baseUrl, {
          params: options?.params,
        });
        return data;
      },
      enabled,
    });

  // Get One
  const useGetOne = (id: string | number, enabled = true) =>
    useQuery<T>({
      queryKey: [queryKey, id],
      queryFn: async () => {
        const { data } = await axiosInstance.get<T>(`${baseUrl}/${id}`);
        return data;
      },
      enabled,
    });

  // Create
  const useCreate = (options: CreateOptions = {}) =>
    useMutation({
      mutationFn: async (newItem: Partial<T>) => {
        const { data } = await axiosInstance.post<T>(baseUrl, newItem);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        if (options?.showToast !== false) {
          toast.success(options?.successMessage || "Créé avec succès");
        }
      },
      onError: (error: any) => {
        const msg =
          error?.response?.data?.error || error.message || "Unknown error";
        toast.error(`${msg}`);
        console.error("Create error:", error.response);
      },
    });

  // Update
  const useUpdate = () =>
    useMutation({
      mutationFn: async (updatedItem: T) => {
        const { data } = await axiosInstance.put<T>(
          `${baseUrl}/${updatedItem.id}`,
          updatedItem
        );
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success("Updated successfully");
      },
      onError: (error: any) => {
        const msg =
          error?.response?.data?.error || error.message || "Unknown error";
        toast.error(`${msg}`);
        console.error("Update error:", error.response);
      },
    });

  // Delete
  const useDelete = () =>
    useMutation({
      mutationFn: async (id: string | number) => {
        const { data } = await axiosInstance.delete(`${baseUrl}/${id}`);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success("Deleted successfully");
      },
      onError: (error: any) => {
        const msg =
          error?.response?.data?.error || error.message || "Unknown error";
        toast.error(`${msg}`);
        console.error("Delete error:", error.response);
      },
    });

  // Inside useCrud<T>()
  const useExport = (filename = "export.csv") =>
    useMutation({
      mutationFn: async () => {
        const url = baseUrl;

        try {
          const response = await axiosInstance.get(url, {
            responseType: "blob",
          });

          const contentType = response.headers["content-type"];
          if (contentType.includes("application/json")) {
            const text = await response.data.text();
            const json = JSON.parse(text);
            if (json.empty) {
              toast.info("Aucune donnée à exporter.");
              return false;
            }
          }
          // ✅ Télécharger le fichier s’il est OK
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });

          // Vérifie si c’est une vraie erreur déguisée (ex: JSON blob)
          if (blob.type === "application/json") {
            const text = await blob.text();
            const json = JSON.parse(text);
            throw new Error(json?.error || "Erreur inconnue");
          }

          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
          window.URL.revokeObjectURL(link.href);

          return true;
        } catch (error: any) {
          toast.error(error?.message || "Erreur d’export");
          console.error("❌ Export failed:", error);
          throw error;
        }
      },
    });

  return {
    useGetAll,
    useGetOne,
    useCreate,
    useUpdate,
    useDelete,
    useExport,
  };
}
