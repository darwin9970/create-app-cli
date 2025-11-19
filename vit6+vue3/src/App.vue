<template>
    <van-config-provider class="van-config" :themeVars="themeVars">
        <router-view v-slot:default="{ Component }">
            <transition>
                <keep-alive>
                    <component :is="Component"></component>
                </keep-alive>
            </transition>
        </router-view>
    </van-config-provider>
</template>
<script setup>
import { ref } from 'vue';
import { useEnv } from '@hooks/useCommon.js';

const env = useEnv();
let themeVars = ref(env.theme);
</script>