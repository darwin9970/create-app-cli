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

## 使用示例

### ahooks useRequest

```tsx
import { useRequest } from 'ahooks';
import { getUserList, saveUser } from '@/services';

const UserList: FC = () => {
  // 基础用法 - 自动请求
  const { data, loading, error, refresh } = useRequest(getUserList);

  // 自动请求带参数 - 使用 defaultParams
  const { data, loading } = useRequest(getUserList, {
    defaultParams: [{ page: 1, size: 10 }]
  });

  // 手动触发
  const { run, loading } = useRequest(getUserList, { manual: true });
  // 调用时传参
  run({ page: 1, size: 10 });

  // 带防抖
  const { run: save } = useRequest(saveUser, {
    debounceWait: 300,
    manual: true
  });

  return <Table dataSource={data} loading={loading} />;
};
```

### Zustand 状态管理

```tsx
// 定义 Store (src/stores/user.ts)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userInfo: UserInfo | null;
}

interface UserActions {
  setUserInfo: (userInfo: UserInfo | null) => void;
  clearUser: () => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set({ userInfo }),
      clearUser: () => set({ userInfo: null })
    }),
    { name: 'user-info' }
  )
);

// 组件中使用 (selector 模式优化渲染)
import { useUserStore } from '@/stores';

const Header: FC = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const clearUser = useUserStore((state) => state.clearUser);

  return <span>{userInfo?.username}</span>;
};

// 非 React 上下文中使用
const token = useUserStore.getState().userInfo?.token;
```

### 自定义 Hooks

#### useChart - ECharts 图表

```tsx
import { useChart } from '@/hooks';

const Dashboard: FC = () => {
  const options = useMemo(
    () => ({
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
      yAxis: { type: 'value' },
      series: [{ data: [120, 200, 150], type: 'bar' }]
    }),
    []
  );

  const { chartRef } = useChart(options);

  return <div ref={chartRef} style={{ width: '100%', height: 400 }} />;
};
```

#### useDownload - 文件下载

```tsx
import { useDownload } from '@/hooks';
import { exportExcel } from '@/services';

const ExportButton: FC = () => {
  const { loading, download } = useDownload(exportExcel, {
    successMsg: '导出成功'
  });

  return (
    <Button
      loading={loading}
      onClick={() => download({ id: 1 }, 'report.xlsx')}
    >
      导出
    </Button>
  );
};
```

#### useAppMessage - 全局消息

```tsx
// React 组件内
import { useAntdApp } from '@/hooks';

const MyComponent: FC = () => {
  const { message, modal, notification } = useAntdApp();
  message.success('操作成功');
};

// 非 React 上下文 (如 request.ts)
import { message, modal } from '@/hooks';

message.error('请求失败');
modal.confirm({ title: '确认删除?' });
```

## License

MIT
