import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as fs from 'fs';

function replaceCDN() {
  return {
    name: 'vite-replace-cdn',
    closeBundle() {
      const entryHTML = 'dist/index.html';
      const CDNPath = "//cdn.jsdelivr.net/gh/ant-galaxy/oasis-engine.github.io@gh-pages/assets/";

      let text = fs.readFileSync(entryHTML, {
        encoding: 'utf8'
      });

      text = text.replace(/\/assets\//g, CDNPath);

      fs.writeFileSync(entryHTML, text, {
        encoding: 'utf8'
      });

      fs.copyFileSync('CNAME', 'dist/CNAME')
    }
  }
}

export default ({ mode }) => {
  return defineConfig({
    server: {
      open: true,
      host: "0.0.0.0",
      port: 3333
    },
    plugins: [
      react(),
      replaceCDN()
    ],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
    build: {
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'oasis-engine': ['oasis-engine'],
            '@oasis-engine/spine': ['@oasis-engine/spine'],
            '@oasis-engine/editor-components': ['@oasis-engine/editor-components'],
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