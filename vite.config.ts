import { defineConfig } from 'vite';
import vitePluginReact from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  build: {
    manifest: false,
    sourcemap: true,
    assetsDir: '', // 빌드한 JS, CSS를 index.html과 같은 루트에 생성.
  },
  plugins: [vitePluginReact()],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
      css: { charset: false },
    },
  },
});
