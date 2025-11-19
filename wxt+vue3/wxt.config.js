import path from 'path';
import { defineConfig } from 'wxt';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import watchAssetsJS from './plugin/watchAssetsJS.js';
import obfuscatorAssetsJS from './plugin/obfuscatorAssetsJS.js';
import manifest from './manifest.js';

// See https://wxt.dev/api/config.html
export default defineConfig({
    extensionApi: 'chrome',
    modules: ['@wxt-dev/module-vue'],
    manifest: manifest,
    vite:()=>({
        plugins: [
            watchAssetsJS(),
            obfuscatorAssetsJS(),
            vueJsx(),
            Components({
                resolvers: [AntDesignVueResolver({
                    importStyle: false,
                    prefix: ''
                })]
            })
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/iframe.scss" as *;'
                }
            }
        },
        resolve: {
            alias: [
                { find: '@components', replacement: path.resolve('components') }
            ]
        }
    })
});
