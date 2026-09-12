import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Agar saytni domenning ichki papkasiga (masalan username.github.io/repo/)
// joylashtirsangiz, quyidagi "base" qiymatini "/repo/" ga o'zgartiring.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
