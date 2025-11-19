import fs from 'fs';

/**
 * @method readSassVar 读取globalVar.scss文件
 * @description 使antd和页面样式保持统
 * */
export const readSassVar = async () => {
    const sassVarData = await fs.promises.readFile('src/assets/scss/globalVar.scss', 'utf8');
    const regex = /\$([a-zA-Z-]+):\s*([^;]+);/g;
    const themeOption = {};

    sassVarData.replace(regex, (match, key, value) => {
        const formattedKey = key.replace(/-([a-zA-Z])/g, (_, group) => group.toUpperCase());
        //$bg-primary: $color-primary; 格式的转为：bgPrimary: ‘10px’
        themeOption[formattedKey] = value.trim().replace(/^\$([a-zA-Z-]+)$/, (match, variable) => {
            const key = variable.replace(/-([a-zA-Z])/g, (_, group) => group.toUpperCase());
            return themeOption[key];
        });
        return '';
    });

    return themeOption;
};

/**
 * @method watchSassVar 监听globalVar.scss是否改
 * @description 如果globalVar.scss改变，服务端通过server.ws.send发送到客户端，客户端通过import.meta.hot.on接收并更新
 * */
export const watchSassVar = () => {
    return {
        name: 'watch-sass-var',
        configureServer(server) {
            server.ws.on('connection', () => {
                fs.watchFile('src/assets/scss/globalVar.scss', async (curr, prev) => {
                    if (curr.mtime !== prev.mtime) {
                        const themeOption = await readSassVar();
                        server.ws.send('theme', themeOption);
                    }
                });
            });
        }
    };
};
