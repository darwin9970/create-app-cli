import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { watchSassVar, readSassVar } from './plugin/watchScssVar';

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'import.meta.env.theme': await readSassVar()
    },
    plugins: [
        vue(),
        watchSassVar(),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, //是否将组件的样式以 CSS-in-JS 的方式导入
                    prefix: ''//标签前缀，默认：<a-button>，配置空后：<Button>
                })
            ]
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
            { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
            { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
            { find: '@common', replacement: path.resolve(__dirname, 'src/common') },
            { find: '@lang', replacement: path.resolve(__dirname, 'src/lang') },
            { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
            { find: '@utility', replacement: path.resolve(__dirname, 'src/utility') }
        ]
    }
});
