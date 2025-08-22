import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  publicDir: 'public',
  build: {
    copyPublicDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep original names for ALL images
          if (/\.(gif|jpe?g|png|svg|webp|ico)$/i.test(assetInfo.name ?? '')) {
            // Return the exact name without hashing
            const name = assetInfo.name ?? '';
            return name;
          }
          // Only hash CSS and JS files
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.md', '**/*.webp', '**/*.jpg', '**/*.png', '**/*.svg'],
  ssr: {
    noExternal: ['react-helmet-async'],
  }
}))