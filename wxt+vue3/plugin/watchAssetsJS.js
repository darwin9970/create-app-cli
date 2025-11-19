import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

/**
 * @method watchAssetsJS 监听静态js是否改变
 * @description 如果assets/js下有文件改动，则重新到构建好的项目中，并刷新插件
 * */
const watchAssetsJS = () => {
    return {
        name: 'watch-assets-js',
        configureServer(server) {
            const staticJsPath = path.resolve('assets', 'js');
            const watcher = chokidar.watch(staticJsPath, {
                persistent: true,
                ignoreInitial: true
            });
            watcher
                .on('add', (filePath) => console.log(`文件添加: ${filePath}`))
                .on('change', (filePath) => {
                    const destPath = path.join(server.config.build.outDir,'assets', 'js',path.basename(filePath));
                    fs.copyFileSync(filePath, destPath); //复制文件到输出目录
                    server.ws.send('wxt:reload-extension');
                })
                .on('unlink', (filePath) => console.log(`文件删除: ${filePath}`));

        }
    };
};

export default watchAssetsJS;
