import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

export default ({ mode }) => {
  return defineConfig({
    server: {
      open: true,
      host: "0.0.0.0",
      port: 3333
    },
    plugins: [
      react(),
    ],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    base: '/archive-engine/',
    build: {
      emptyOutDir: true,
      rollupOptions: {
        input: {
          engine: fileURLToPath(new URL('./index.html', import.meta.url)),
          index: fileURLToPath(new URL('./home.html', import.meta.url)),
        },
        output: {
          manualChunks: {
            '@galacean/engine': ['@galacean/engine'],
            '@galacean/engine-spine': ['@galacean/engine-spine'],
            '@galacean/editor-ui': ['@galacean/editor-ui'],
            '@babel/standalone': ['@babel/standalone'],
            'mermaid': ['mermaid']
          },
          chunkFileNames() {
            return 'assets/modules/[name]-[hash].js'
          }
        },
      }
    }
  })
}