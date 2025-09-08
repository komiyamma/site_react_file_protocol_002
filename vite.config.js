import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/simple-landing-page/' : './', // GitHub Pages対応
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2015', // 古いブラウザ対応
    rollupOptions: {
      output: {
        format: 'iife', // ES Modulesではなく即座実行関数形式で出力
        manualChunks: undefined,
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})