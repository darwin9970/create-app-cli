# Create Template App

🚀 一个完整的项目脚手架解决方案，包含多种前端技术栈模板和自动化 CLI 工具。

## 📁 项目结构

```
create-template-app/
├── create-app-cli/          # CLI 脚手架工具
├── vit6+vue3/              # Vite 6 + Vue 3 + Vant (移动端)
├── vite6+react19/          # Vite 6 + React 19 + Ant Design
├── vite6+react19+ts5/      # Vite 6 + React 19 + TypeScript 5 + Ant Design
├── vite6+vue3+ts5/         # Vite 6 + Vue 3 + TypeScript 5 + Ant Design Vue
├── wxt+vue3/               # WXT + Vue 3 (浏览器扩展)
└── umi4+react18+ts+antd5+zustand/  # UmiJS 4 + React 18 + TypeScript + Ant Design 5 + Zustand
```

## ✨ 特性

- 📦 **6 种技术栈模板** - 涵盖移动端、Web 应用、浏览器扩展、企业级应用
- 🛠️ **CLI 脚手架工具** - 一键创建项目，支持自定义配置
- 🎨 **开箱即用** - 所有模板已配置好最佳实践
- ⚡ **现代化** - 使用最新的 Vite、React、Vue 技术栈
- 🔧 **灵活配置** - 支持选择包管理器、跳过安装等

## 📋 可用模板

| 模板目录                        | 技术栈                                                   | 适用场景        |
| ------------------------------- | -------------------------------------------------------- | --------------- |
| `vit6+vue3`                     | Vite 6 + Vue 3 + Vant + Pinia                            | 移动端 H5 应用  |
| `vite6+react19`                 | Vite 6 + React 19 + Ant Design + Redux Toolkit           | React Web 应用  |
| `vite6+react19+ts5`             | Vite 6 + React 19 + TypeScript 5 + Ant Design            | React + TS 应用 |
| `vite6+vue3+ts5`                | Vite 6 + Vue 3 + TypeScript 5 + Ant Design Vue           | Vue + TS 应用   |
| `wxt+vue3`                      | WXT + Vue 3 + Ant Design Vue                             | 浏览器扩展      |
| `umi4+react18+ts+antd5+zustand` | UmiJS 4 + React 18 + TypeScript + Ant Design 5 + Zustand | 企业级中后台    |

## 🚀 快速开始

### 方式一：使用 CLI 工具（推荐）

```bash
# 1. 进入 CLI 工具目录
cd create-app-cli

# 2. 安装依赖
npm install

# 3. 链接到全局
npm link

# 4. 创建项目
create-app my-project
```

详细使用说明请查看 [create-app-cli/README.md](./create-app-cli/README.md)

### 方式二：直接复制模板

```bash
# 复制你需要的模板
cp -r vite6+vue3+ts5 /path/to/your/project

# 进入项目
cd /path/to/your/project

# 安装依赖
npm install

# 启动开发
npm run dev
```

## 📖 模板详情

### 移动端模板 - vit6+vue3

**技术栈：**

- Vite 6
- Vue 3 (Composition API)
- Vant 4 (移动端 UI 组件库)
- Vue Router 4
- Pinia (状态管理)
- Sass

**适用场景：** 移动端 H5 应用、微信公众号、小程序 H5 页面

### React 模板 - vite6+react19

**技术栈：**

- Vite 6
- React 19
- Ant Design 5
- React Router 6
- Redux Toolkit (状态管理)
- Sass

**适用场景：** PC 端 Web 应用、管理后台、企业级应用

### React + TypeScript 模板 - vite6+react19+ts5

**技术栈：**

- Vite 6
- React 19
- TypeScript 5
- Ant Design 5
- React Router 6
- Redux Toolkit
- Sass

**适用场景：** 需要类型安全的大型 React 项目

### Vue + TypeScript 模板 - vite6+vue3+ts5

**技术栈：**

- Vite 6
- Vue 3 (Composition API)
- TypeScript 5
- Ant Design Vue 4
- Vue Router 4
- Pinia
- Sass

**适用场景：** 需要类型安全的大型 Vue 项目

### 浏览器扩展模板 - wxt+vue3

**技术栈：**

- WXT (浏览器扩展框架)
- Vue 3
- Ant Design Vue
- TypeScript

**适用场景：** Chrome/Firefox/Edge 浏览器扩展开发

### 企业级中后台模板 - umi4+react18+ts+antd5+zustand

**技术栈：**

- UmiJS 4 (企业级前端框架)
- React 18
- TypeScript 5
- Ant Design 5
- Ant Design Pro Components
- Zustand (状态管理)
- ahooks (React Hooks 库)
- ECharts 6 (图表库)
- TailwindCSS

**适用场景：** 企业级中后台管理系统、复杂业务系统、数据可视化平台

## 🔧 开发说明

### 添加新模板

1. 在根目录创建新的模板目录
2. 添加必要的配置文件（`package.json`、`vite.config.js` 等）
3. 在 `create-app-cli/lib/utils.js` 中的 `getAvailableTemplates()` 函数添加模板配置
4. 测试模板是否可正常使用

### 更新现有模板

1. 修改对应模板目录的文件
2. 测试确保修改不影响现有功能
3. 更新文档说明

## 📦 模板共同特性

所有模板都包含：

- ✅ **ESLint + Prettier** - 代码规范和格式化
- ✅ **Sass 支持** - CSS 预处理器
- ✅ **路由配置** - 开箱即用的路由管理
- ✅ **状态管理** - Pinia (Vue) / Redux Toolkit (React)
- ✅ **开发服务器** - 热更新支持
- ✅ **生产构建** - 优化的打包配置
- ✅ **Git 友好** - 预配置 .gitignore

## 🎯 CLI 工具特性

详见 [create-app-cli/README.md](./create-app-cli/README.md)

- 🎨 交互式创建项目
- 📦 自动安装依赖（支持 npm/yarn/pnpm）
- 🔧 自动初始化 Git
- ✅ 完善的错误处理
- 🚀 开箱即用

## 📝 使用建议

### 选择模板

- **移动端项目** → `vit6+vue3`
- **React 项目** → `vite6+react19` 或 `vite6+react19+ts5`
- **Vue 项目** → `vite6+vue3+ts5`
- **浏览器扩展** → `wxt+vue3`
- **企业级中后台** → `umi4+react18+ts+antd5+zustand`
- **需要 TypeScript** → 选择带 `ts` 或 `ts5` 的模板

### 包管理器

- **npm** - 默认，兼容性最好
- **yarn** - 速度快，适合日常开发
- **pnpm** - 节省磁盘空间，推荐用于多项目

## ⚠️ 注意事项

- Node.js 版本需要 >= 16.0.0（推荐使用 LTS 版本）
- 确保有足够的磁盘空间（每个项目约 200-500MB）
- 网络环境需要能访问 npm registry
- 首次安装依赖会比较慢，请耐心等待

## 📄 License

MIT

## 👨‍💻 作者

[@xiangxiwen](https://github.com/xiangxiwen)

---

**⭐ 如果这个项目对你有帮助，欢迎 Star！**
