import { ref } from 'vue';

/**
 * @method useEnv 获取env变量
 * @returns {Object} 转换后的值
 * */
const useEnv = () => {
    const env = import.meta.env;
    let theme = ref(env.theme);
    if (import.meta.hot) {
        import.meta.hot.on('theme', (data) => {
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
