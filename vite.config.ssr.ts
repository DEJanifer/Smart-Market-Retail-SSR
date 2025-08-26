import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { builtinModules } from 'module'

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
        format: 'es',
        entryFileNames: 'entry-server.js',
        // Bundle everything into a single file
        inlineDynamicImports: true,
      },
      // Externalize Node.js built-in modules to prevent bundling issues
      external: [...builtinModules, ...builtinModules.map(m => `node:${m}`)],
    },
    target: 'node16',
    minify: false,
    // Bundle all dependencies
    commonjsOptions: {
      ignoreDynamicRequires: true,
    },
  },
  ssr: {
    // Externalize Node.js built-in modules but bundle npm packages
    external: [...builtinModules, ...builtinModules.map(m => `node:${m}`)],
    target: 'node',
  },
})