# react_antd

#### 介绍
antd前端PC框架，node环境V18+，使用更高版本出现问题，可降至V18；搭建时使用的版本20.11.0

#### 软件架构
软件架构采用：reactV18+antd+vite+axios+redux+sass
1. react：https://react.nodejs.cn/reference/react/hooks
2. antd：https://ant-design.antgroup.com/components/pagination-cn/
3. axios：https://www.axios-http.cn/docs/api_intro
4. vite：https://vitejs.cn/
5. redux：https://cn.redux.js.org/index.html
6. redux-persist：https://github.com/rt2zz/redux-persist
7. sass：https://blog.csdn.net/randy521520/article/details/131242242


#### 目录结构src
```
    |-- assets 静态资源
    |   |-- scss 样式文件
    |   |   |-- globals.scss 全局样式文件
    |   |   |-- globalMixin.scss 全局sass mixin函数
    |   |   |-- iframe.scss 初始化样式文件引入
    |   |   |-- globalVar.scss 全局sass变量
    |   |-- font 字体
    |   |-- images 静态图片
    |-- common 公共项目文件，用于放一些公共枚举、请求等
    |   |-- enum.js 公共枚举文件
    |   |-- menu.js 菜单配置
    |   |-- requests.js 公共请求封装
    |-- components 公共组件
    |   |-- common 公共组件
    |   |-- dataView 数据展示组件
    |   |-- feature 功能性组件
    |   |-- layout 布局组件
    |   |-- page 页面级组件，一般用于某个模块功能组件封装
    |-- hooks 公共hooks函数
    |   |-- useCommon.js 通用hooks
    |   |-- useEventEmitter.js 事件发射器
    |-- lang 国际化语言配置
    |-- pages 页面
    |-- utils 存放全局js文件
    |   |-- commonUtil.js 公共js
    |   |-- dateUtil.js  日期js
    |   |-- regUtil.js  正则js
    |   |-- storageUtil.js  缓存js
    |   |-- eventEmitterUtil.js  事件发射器
    |-- App.vue vue项目根组件
    |-- main.js 项目入口文件
    |-- router.js 路由配置
    |-- style.scss 页面初始化样式
```

#### JS规范

+ 命名规范，使用小驼峰命名
```
1. 事件命名，如：onTableClick，统一on开头，事件名称结尾
2. 请求获取命名，如：getDataRequest，统一get开头，Request结尾
3. 请求修改命名，如：updateDataRequest，统一update开头，Request结尾
4. 请求修删除命名，如：deleteDataRequest，统一delete开头，Request结尾
5. 变量命名，如：userInfo
```

+ 语法规范
```
1. 字符串统一使用单引号‘’，标签内的属性和import除外
2. 字符串拼接，统一使用``
```

+ 注释规范
```
1. 方法、参数注释，采用多行注释，https://blog.csdn.net/randy521520/article/details/116536475?spm=1001.2014.3001.5501
2. 变量及其他注释，采用单行注释
3. 需要优化的代码，单行注释开始需加上todo
```

#### 使用说明

1. yarn dev 启动开发环境
2. yarn pro 启动生产环境
3. yarn build:dev 构建开发环境
4. yarn build:pro 构建生产环境
5. yarn preview 本地预览构建好的项目
6. yarn lint 检查代码是否符合eslint规范
7. yarn fix 自动修复项目