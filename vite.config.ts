import {defineConfig} from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: ['./src/index.ts', './src/crypto.ts', './src/delayAsync.ts', './src/event.ts', './src/math.ts', './src/util.ts', './src/validate.ts'],
      fileName: (format, entryName) => `${entryName}.${format}.js`
    },
    emptyOutDir: false
  }
})
