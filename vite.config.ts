import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'utils',
      fileName: (format) => `utils.${format}.js`
    },
    emptyOutDir: false
  }
})
