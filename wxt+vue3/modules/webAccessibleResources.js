import path from 'path';
import fs from 'fs';
import { defineWxtModule } from 'wxt/modules';

export default defineWxtModule({
    setup(wxt) {
        const generatedFilePath = path.join('assets', 'js');
        const staticJsPath = path.join(wxt.config.srcDir, generatedFilePath);
        const staticResourcesPath = [];

        const fileList = fs.readdirSync(path.resolve(generatedFilePath));
        fileList.forEach((fileName) => {
            const absoluteSrc = path.join(staticJsPath, fileName);
            const relativeDest = path.join(generatedFilePath, fileName);
            staticResourcesPath.push(relativeDest.replace(/\\/g, '/'));
            //正式环境会由obfuscatorAssetsJS插件将静态js写入到输出目录中
            if(wxt.config.env.mode === 'development'){
                wxt.hook('build:publicAssets', (_, assets) => {
                    assets.push({
                        absoluteSrc,
                        relativeDest
                    });
                });
            }
        });

        wxt.hook('build:manifestGenerated', (_, manifest) => {
            manifest.action.default_title = '爬虫工具';
            manifest.web_accessible_resources = [{
                matches: ['<all_urls>'],
                resources: staticResourcesPath
            }];
        });
    }
});