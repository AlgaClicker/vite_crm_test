import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'
import  process from 'process';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        }
      }
    }),
  ],
  configurewebpack: {
    process: process
  },
  server: {
    port: 8808,
    hot: true, host: '0.0.0.0'

  },
  resolve: {
    fallback : {
      process: process
    },
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': fileURLToPath(new URL('./node_modules/bootstrap', import.meta.url)),
      vue$: 'node_modules/vue/dist/vue.runtime.esm.js',
      
      'bootstrap-vue$': 'bootstrap-vue/src/index.js'
    }
  }
})
