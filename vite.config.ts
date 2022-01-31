import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/mobile/v2/': {
        target: 'https://api.snapp.express/mobile/v2/',
        changeOrigin: true,
      },
    },
  },
});
