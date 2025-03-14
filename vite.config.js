import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [tailwind, autoprefixer],
    }
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
    },
  },
  filenameHashing: false,
  assetsInclude: ['**/*.html']
})
