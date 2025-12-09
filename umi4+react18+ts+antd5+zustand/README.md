# Data Center Manager

数据中心管理平台 - 企业级数据集成与管理解决方案

## 技术栈

| 类别     | 技术                                                       |
| -------- | ---------------------------------------------------------- |
| 框架     | [Umi Max](https://umijs.org/docs/max/introduce) (React 18) |
| UI 组件  | [Ant Design 5](https://ant.design/)                        |
| 状态管理 | [Zustand](https://zustand-demo.pmnd.rs/)                   |
| 样式方案 | Less + [TailwindCSS](https://tailwindcss.com/)             |
| 流程编排 | [@xyflow/react](https://reactflow.dev/)                    |
| 代码规范 | Prettier + Husky + lint-staged                             |
| 类型检查 | TypeScript 5                                               |

## 项目结构

```
src/
├── access.ts              # 权限配置
├── app.tsx                # 运行时配置
├── global.less            # 全局样式
├── loading.tsx            # 全局加载组件
├── assets/                # 静态资源
├── components/            # 通用组件
│   └── ErrorBoundary/     # 错误边界
├── constants/             # 常量定义
├── hooks/                 # 自定义 Hooks
├── layouts/               # 布局组件
│   └── BasicLayout.tsx    # 主布局（顶部导航 + 侧边栏）
├── pages/                 # 页面组件
│   └── Login/             # 登录页
├── services/              # API 服务层
│   ├── user.ts            # 用户相关接口(示例)
│   └── system.ts          # 系统设置接口(示例)
├── stores/                # 状态管理
│   ├── app.ts             # 应用状态（侧边栏折叠等）(示例)
│   └── user.ts            # 用户状态（登录信息）(示例)
├── types/                 # 类型定义
├── utils/                 # 工具函数
│   └── request.ts         # 请求封装（拦截器、错误处理）
└── wrappers/              # 路由包装器
    └── auth.tsx           # 登录鉴权
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8（推荐）

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:8001

### 构建

```bash
# 测试环境
pnpm build:test

# 生产环境
pnpm build:prod
```

## 开发规范

### 代码格式化

```bash
pnpm format
```

### Git 提交

项目已配置 Husky + lint-staged，提交时自动格式化代码。

### 目录命名

- 组件目录：PascalCase（如 `ErrorBoundary/`）
- 工具/服务：camelCase（如 `request.ts`）
- 页面目录：PascalCase（如 `Dashboard/`）

## 环境配置

| 环境 | 配置文件                | API 地址              |
| ---- | ----------------------- | --------------------- |
| 开发 | `config/config.dev.ts`  | http://localhost:8080 |
| 测试 | `config/config.test.ts` | 测试服务器            |
| 生产 | `config/config.prod.ts` | 生产服务器            |

## License

MIT
