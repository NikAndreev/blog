import { defineConfig } from 'vite'
import { resolve } from "path";
import path from "path";
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
    server: {
        fs: {
            strict: false
        }
    },
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, "./src/public"),
    build: {
        emptyOutDir: true,
        outDir: resolve(__dirname, "./build"),
        rollupOptions: {
            input: {
                main_js: resolve(__dirname, "src/main.js"),
                main: resolve(__dirname, "src/index.html"),
            },
        }
    },
    resolve: {
        alias: {
            '@root': path.join(__dirname),
            '@src': path.join(__dirname, 'src'),
            '@node': path.join(__dirname, 'node_modules'),
        },
    }
})
