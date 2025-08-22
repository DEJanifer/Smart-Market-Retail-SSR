import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Separate config for SSR builds that outputs CommonJS for Netlify Functions
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    ssr: true,
    outDir: 'dist/server',
    rollupOptions: {
      input: 'src/entry-server.tsx',
      output: {
        format: 'cjs',
        entryFileNames: 'entry-server.js',
        // Bundle everything into a single file
        inlineDynamicImports: true,
      },
      // Don't externalize any dependencies - bundle everything
      external: [],
    },
    target: 'node16',
    minify: false,
    // Bundle all dependencies
    commonjsOptions: {
      ignoreDynamicRequires: true,
    },
  },
  ssr: {
    // Don't externalize any packages - bundle everything
    noExternal: true,
    target: 'node',
  },
})