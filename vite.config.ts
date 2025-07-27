import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@Layout": "/src/Layout",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
    },
  },
});
