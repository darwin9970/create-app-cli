import { useState } from 'react';

/**
 * @method useEnv 获取env变量
 * @returns {Object} 转换后的值
 * */
const useEnv = () => {
    let env = import.meta.env;
    let [theme,setTheme] = useState(env.theme);
    if (import.meta.hot) {
        import.meta.hot.on('theme', (data) => {
            setTheme(data);
        });
    }
    return {
        theme: theme,
        envName: env.VITE_ENV_NAME
    };
};

export {
    useEnv
};