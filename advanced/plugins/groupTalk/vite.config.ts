import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig(({}) => {
  return {
    mode: 'development',
    root: path.resolve(__dirname, 'src/'),
    base: '',
    define: {},
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {},
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src'),
        },
      ],
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    plugins: [
      react({
        include: '**/*.{jsx,tsx}',
      }),
      commonjs(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
