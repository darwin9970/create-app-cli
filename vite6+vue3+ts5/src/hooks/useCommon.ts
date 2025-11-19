import { Ref, ref } from 'vue';


/**
 * @method useEnv 获取env变量
 * @returns {Hooks.Env} 转换后的值
 * */
const useEnv = (): Hooks.Env => {
    const env: ImportMetaEnv = import.meta.env;
    const theme: Ref<Record<string, string>> = ref(env.theme);
    if (import.meta.hot) {
        import.meta.hot.on('theme', (data): void => {
            theme.value = data;
        });
    }
    return {
        envName: env.VITE_ENV_NAME,
        theme: theme
    };
};

export {
    useEnv
};