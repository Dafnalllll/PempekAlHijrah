import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: [fileURLToPath(new URL("./app/assets/css/main.css", import.meta.url))],

  vite: {
    plugins: [tailwindcss()],
  },
});
