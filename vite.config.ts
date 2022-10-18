import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  return defineConfig({
    server: {
      open: true,
      host: "0.0.0.0",
      port: 4000
    },
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    build: {
      emptyOutDir: true
    }
  })
}