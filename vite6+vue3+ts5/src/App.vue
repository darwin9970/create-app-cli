<template>
    <Config-provider class="ant_config"
                     :theme="{token: themeVars}">
        <router-view v-slot:default="{ Component }">
            <transition>
                <keep-alive>
                    <component :is="Component"></component>
                </keep-alive>
            </transition>
        </router-view>
    </Config-provider>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useEnv } from '@hooks/useCommon.js';

let env = useEnv();
let themeVars = ref(env.theme);
</script>