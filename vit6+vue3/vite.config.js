import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { postcssConfig } from './postcss.config.js';
import { watchSassVar, readSassVar } from './plugin/watchScssVar.js';


export default defineConfig({
    define: {
        'import.meta.env.theme': await readSassVar(),
        'import.meta.env.postConfig': postcssConfig
    },
    plugins: [
        vue(),
        watchSassVar(),
        Components({
            resolvers: [VantResolver()]
        })
    ],
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
            { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
            { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
            { find: '@utility', replacement: path.resolve(__dirname, 'src/utility') },
            { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
            { find: '@lang', replacement: path.resolve(__dirname, 'src/lang') },
            { find: '@common', replacement: path.resolve(__dirname, 'src/common') },
            { find: '@api', replacement: path.resolve(__dirname, 'src/api') }
        ]
    }
});
