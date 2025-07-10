import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';

const isBuild = process.env.BUILD_MODE === 'electron';

export default defineConfig({
  plugins: [
    react(),
    ...(isBuild
      ? [
          electron({
            entry: 'electron/main.ts',
            vite: {
              build: {
                outDir: 'dist-electron',
                rollupOptions: {
                  input: {
                    main: 'electron/main.ts',
                    preload: 'electron/preload.ts',
                  },
                },
              },
            },
          }),
          renderer(),
        ]
      : []),
  ],
});
