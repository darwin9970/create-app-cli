import fs from 'fs';
import { ViteDevServer,Plugin } from 'vite';

/**
 * @method readSassVar 读取globalVar.scss文件
 * @description 使antd和页面样式保持统
 * */
export const readSassVar = async ():Promise<Record<string, string>> => {
    const sassVarData:string = await fs.promises.readFile('src/assets/scss/globalVar.scss', 'utf8');
    const regex:RegExp = /\$([a-zA-Z-]+):\s*([^;]+);/g;
    const themeOption:Record<string, string> = {};

    sassVarData.replace(regex, (match:string, key:string, value:string):string => {
        const formattedKey:string = key.replace(/-([a-zA-Z])/g, (_:string, group:string) => group.toUpperCase());
        //$bg-primary: $color-primary; 格式的转为：bgPrimary: ‘10px’
        themeOption[formattedKey] = value.trim().replace(/^\$([a-zA-Z-]+)$/, (match:string, variable:string) => {
            const key = variable.replace(/-([a-zA-Z])/g, (_:string, group:string) => group.toUpperCase());
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
export const watchSassVar = ():Plugin => {
    return {
        name: 'watch-sass-var',
        configureServer(server:ViteDevServer):void {
            server.ws.on('connection', ():void => {
                fs.watchFile('src/assets/scss/globalVar.scss', async (curr:fs.Stats, prev:fs.Stats):Promise<void> => {
                    if (curr.mtime !== prev.mtime) {
                        const themeOption:Record<string, string> = await readSassVar();
                        server.ws.send('theme', themeOption);
                    }
                });
            });
        }
    };
};
