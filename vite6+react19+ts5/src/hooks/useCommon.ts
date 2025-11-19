import { useState } from 'react';


/**
 * @method useEnv 获取env变量
 * @returns {Hooks.Env} 转换后的值
 * */
const useEnv = ():Hooks.Env => {
    const env:ImportMetaEnv = import.meta.env;
    const [theme,setTheme]:UseStateRecord<string, string> = useState(env.theme);
    if (import.meta.hot) {
        import.meta.hot.on('theme', (data):void => {
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