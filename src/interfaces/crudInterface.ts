export interface UseCrudOptions<T> {
  baseUrl: string;
  queryKey: string;
  enabled?: boolean;
}

export type CreateOptions = {
  successMessage?: string; // ex: "Client ajouté"
  showToast?: boolean; // ex: false for login
};
