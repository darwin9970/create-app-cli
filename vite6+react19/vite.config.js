import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { watchSassVar, readSassVar } from './plugin/watchScssVar.js';

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'import.meta.env.theme': await readSassVar()
    },
    plugins: [react(), watchSassVar()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@/assets/scss/iframe" as *;'
            }
        }
    },
    build: {
        chunkSizeWarningLimit: 1600
    },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
            { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
            { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
            { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
            { find: '@lang', replacement: path.resolve(__dirname, 'src/lang') },
            { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
            { find: '@common', replacement: path.resolve(__dirname, 'src/common') },
            { find: '@utility', replacement: path.resolve(__dirname, 'src/utility') }
        ]
    }
});
