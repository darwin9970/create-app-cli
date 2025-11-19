# chrome_plugin

#### 介绍
Vue3搭建浏览器插件的单页面应用，node环境V18+，使用更高版本出现问题，可降至V18；搭建时使用的版本20.13.0

#### 软件架构
软件架构采用：WXT + Vue3 + sass + antd + vite
1. vue3：web开发框架 https://cn.vuejs.org/
2. antd官网：ui组件库，https://www.antdv.com/components/config-provider-cn
3. vite：https://vitejs.cn/
4. sass基础语法：https://blog.csdn.net/randy521520/article/details/131242242
5. WXT：https://wxt.dev/
6. gulp-javascript-obfuscator：https://github.com/javascript-obfuscator/gulp-javascript-obfuscator
7. 谷歌插件开发文档：https://developer.chrome.google.cn/docs/extensions/reference/api?hl=lv

#### 目录结构src
```
    |-- assets 静态资源
    |   |-- scss 样式文件
    |   |   |-- globals.scss 全局样式文件
    |   |   |-- globalMixin.scss 全局sass mixin函数
    |   |   |-- iframe.scss 初始化样式文件引入
    |   |   |-- globalVar.scss 全局sass变量
    |   |-- font 字体
    |   |-- js 静态js文件
    |   |   |-- proxy.js 代理js脚本
    |   |   |-- webTools.js 网页工具脚本，封装一些常用的方法
    |-- components 公共组件
    |   |-- common 公共组件
    |   |-- options 配置页相关组件
    |-- entrypoints 浏览器插件页面
        |-- options 配置页面，用于manifest.json文件配置options_page
            |-- App.vue 配置页面根组件
            |-- index.html 配置页面html
            |-- main.js 配置页面入口文件
        |-- popup 下拉页面，用于manifest.json文件配置action
            |-- App.vue 下拉页面根组件
            |-- index.html 下拉页面入口html
            |-- main.js 下拉页面入口文件
        |-- background.js 浏览器插件server work脚本
        |-- contetn.js 浏览器插件content脚本
        |-- style.scss 页面初始化样式
    |-- modules WXT模块，WXT模块通常用于构建项目时修改某些配置或文件
        |-- webAccessibleResources.js assets/js中的脚本，在构建项目时不会被打包，该脚本用于打包assets/js中的脚本
    |-- plugin VITE插件
        |--obfuscatorAssetsJS.js 混肴assets/js中的脚本，保证代码的安全性
        |--watchAssetsJS.js 监听assets/js中的脚本，当脚本发生变化时，更新打包好的assets/js，并刷新浏览器插件
```

#### JS规范

+ 注释规范
```
1. 方法、参数注释，采用多行注释，https://blog.csdn.net/randy521520/article/details/116536475?spm=1001.2014.3001.5501
2. 变量及其他注释，采用单行注释
3. 需要优化的代码，单行注释开始需加上todo
```

#### 使用说明

1. yarn dev 启动开发环境
2. yarn pro 启动正式环境
3. yarn dev:firefox 启动Firefox开发环境
4. yarn pro:firefox 启动Firefox正式环境
5. yarn build 构建正式环境
6. yarn build:firefox 构建Firefox正式环境
7. yarn zip 打包正式环境
8. yarn zip:firefox 打包Firefox正式环境
9. yarn compile 类型检查
10. yarn fix 自动修复项目
11. yarn lint 检查代码是否符合eslint规范