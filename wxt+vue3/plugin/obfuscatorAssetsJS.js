import path from 'path';
import gulp from 'gulp';
import javascriptObfuscator from 'gulp-javascript-obfuscator';
/**
 * @method obfuscatorAssetsJS 静态js无法通过vite混淆加密
 * @description 此插件用于静态js混淆加密
 * */
const obfuscatorAssetsJS = () => {
    return {
        name: 'obfuscator-assets-js',
        configureServer(server) {
            //开发环境会由webAccessibleResources模块将静态js写入到输出目录中
            if(server.config.env.PROD){
                const staticJsPath = path.resolve('assets', 'js','*.js');
                const destPath = path.join(server.config.build.outDir,'assets', 'js');
                gulp.src(staticJsPath)
                    .pipe(javascriptObfuscator({
                        deadCodeInjection: false, // 注入死代码
                        debugProtection: false, // 启用调试保护
                        selfDefending: false, // 启用自防御功能
                        unicodeEscapeSequence: false, // 禁用Unicode转义序列
                        identifierNamesGenerator: 'mangled' // 使用简单的变量名混淆
                    }))
                    .pipe(gulp.dest(destPath));
            }
        }
    };
};

export default obfuscatorAssetsJS;
