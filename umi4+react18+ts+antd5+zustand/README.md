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
├── app.tsx                # 运行时配置（动态路由注入）
├── global.less            # 全局样式
├── loading.tsx            # 全局加载组件
├── assets/                # 静态资源
├── components/            # 通用组件
│   ├── ErrorBoundary/     # 错误边界
│   ├── PageContainer/     # 页面容器
│   ├── SearchForm/        # 查询表单
│   └── CodeEditor/        # 代码编辑器
├── constants/             # 常量定义
├── hooks/                 # 自定义 Hooks
├── layouts/               # 布局组件
│   └── BasicLayout.tsx    # 主布局（顶部导航 + 动态侧边栏）
├── pages/                 # 页面组件
│   ├── Dashboard/         # 仪表盘模块
│   │   └── Workplace/     # 工作台（React Flow 编排示例）
│   └── System/            # 系统管理模块
│       ├── User/          # 用户管理（ProTable 示例）
│       └── Role/          # 角色管理（Mock 数据示例）
├── services/              # API 服务层
│   ├── user.ts            # 用户相关接口
│   ├── menu.ts            # 菜单/路由接口
│   ├── role.ts            # 角色相关接口
│   ├── flow.ts            # 流程编排接口
│   └── analysis.ts        # 分析相关接口
├── stores/                # 状态管理
│   ├── app.ts             # 应用状态（侧边栏折叠等）
│   ├── user.ts            # 用户状态（登录信息）
│   └── menu.ts            # 菜单状态（动态菜单）
├── types/                 # 类型定义
├── utils/                 # 工具函数
│   ├── request.ts         # 请求封装（拦截器、错误处理）
│   ├── storage.ts         # Storage 封装（类型安全、过期时间）
│   ├── format.ts          # 格式化工具（日期、金额、脱敏等）
│   └── routes.tsx         # 动态路由工具（组件映射、路由生成）
└── wrappers/              # 路由包装器
    ├── auth.tsx           # 登录鉴权
    └── permission.tsx     # 权限拦截（权限点字符串 + 菜单 access）
```

## 架构设计

本项目采用 **Layered Architecture (分层架构)**，基于 **UmiJS Max** + **Ant Design Pro** 技术栈。

1.  **View Layer (视图层)**: `src/pages` 和 `src/components`。使用了 React 18 函数式组件 + Hooks。
2.  **State Layer (状态层)**: 采用了 **Zustand** 进行全局状态管理 (`src/stores`)，轻量且高效。
3.  **Service Layer (服务层)**: `src/services` 封装了 API 请求，实现了 UI 与数据获取的解耦。
4.  **Infrastructure Layer (基础设施层)**: `src/utils` 提供了请求封装、存储管理等底层能力。

### 核心亮点

- **动态路由**: 实现了基于后端的动态路由 (`app.tsx` + `BasicLayout.tsx`)，支持顶部模块导航 + 左侧子菜单的复杂布局。
- **流程编排**: 集成了 React Flow，实现了支持拖拽、连线、Mock 执行的 ETL 流程编辑器。
- **最佳实践**: 统一了数据列表 (`ProTable`)、表单 (`ProForm`)、请求处理 (`useRequest`) 的开发范式。

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

### Mock 登录账号

- **admin** / **123456**（管理员，拥有全部权限）
- **user** / **123456**（普通用户，仅拥有部分权限）

### 常用命令

```bash
pnpm dev        # 本地开发
pnpm build      # 构建
pnpm lint       # ESLint 检查
pnpm format     # Prettier 格式化
```

## 开发规范

### 1. 列表页开发范式

推荐使用 `ProTable` + `useRequest` 模式：

```tsx
import { ProTable } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { getUserList, deleteUser } from '@/services';

const UserList: FC = () => {
  const actionRef = useRef<ActionType>();

  // 删除操作
  const { run: runDelete } = useRequest(deleteUser, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      actionRef.current?.reload();
    }
  });

  return (
    <ProTable
      actionRef={actionRef}
      request={async (params) => {
        // 适配后端分页格式
        const res = await getUserList({
          ...params,
          current: params.current,
          pageSize: params.pageSize
        });
        return {
          data: res.data.list,
          success: res.success,
          total: res.data.total
        };
      }}
      columns={[
        { title: '名称', dataIndex: 'name' },
        {
          title: '操作',
          valueType: 'option',
          render: (_, record) => [
            <a onClick={() => runDelete(record.id)}>删除</a>
          ]
        }
      ]}
    />
  );
};
```

### 2. Mock 数据开发

在 `mock/` 目录下创建对应文件，使用 `defineMock` 定义接口：

```ts
import { defineMock } from '@umijs/max';

export default defineMock({
  'GET /api/role/list': (req, res) => {
    res.json({
      success: true,
      data: {
        list: [{ id: 1, name: 'Admin' }],
        total: 1
      }
    });
  }
});
```

### 3. Service 层定义

在 `src/services/` 下定义类型和请求：

```ts
import request from '@/utils/request';
import type { ApiResponse } from '@/types';

export async function getRoleList(params?: any) {
  return request.get<ApiResponse<RoleListResult>>('/api/role/list', params);
}
```

## 环境配置

| 环境 | 配置文件                | API 地址              |
| ---- | ----------------------- | --------------------- |
| 开发 | `config/config.dev.ts`  | http://localhost:8080 |
| 测试 | `config/config.test.ts` | 测试服务器            |
| 生产 | `config/config.prod.ts` | 生产服务器            |

## 动态路由

项目支持后端返回路由/菜单，前端动态渲染。

### 工作流程

```
登录 → 获取菜单 API → 存储到 menuStore → patchClientRoutes 注入路由 → 渲染侧边栏
```

### 后端返回格式

```ts
// GET /api/menu/list
interface MenuItem {
  path: string; // 路由路径
  name?: string; // 菜单名称
  icon?: string; // 图标名称（如 'DashboardOutlined'）
  component?: string; // 组件路径（如 './Dashboard/Analysis'）
  redirect?: string; // 重定向地址
  routes?: MenuItem[]; // 子路由
}
```

### 新增页面步骤

1. **创建页面组件**：`src/pages/NewModule/NewPage/index.tsx`

2. **注册组件映射**：`src/utils/routes.tsx`

```tsx
const componentMap = {
  // 新增
  'NewModule/NewPage': NewModuleNewPage
};
```

3. **后端配置菜单**：在菜单接口返回对应路由项

### 权限控制

项目已落地 **Umi Access + PermissionWrapper** 的权限体系（Mock 阶段同样生效）：

- **权限点**：使用字符串（例如 `system.user.view`）。
- **菜单字段**：菜单叶子节点使用 `access` 字段承载权限点。
- **路由拦截**：通过 `src/wrappers/permission.tsx` 在路由层统一拦截。
- **按钮/区域控制**：组件内通过 `useAccess().hasPermission('xxx')` 控制。
- **登录/退出刷新**：登录/退出会刷新 `@@initialState`，确保权限即时生效。

接入真实后端时，建议后端登录接口返回 `userInfo.permissions: string[]`，并保证菜单 `access` 与权限点一致。

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

### 工具函数

#### Storage 封装

```tsx
import { local, session } from '@/utils';

// localStorage
local.set('key', { data: 1 }); // 存储
local.set('key', { data: 1 }, 3600000); // 存储，1小时后过期
const data = local.get<{ data: number }>('key'); // 获取（类型安全）
local.remove('key'); // 删除
local.clear(); // 清空

// sessionStorage
session.set('temp', 'value');
session.get<string>('temp');
```

#### 格式化工具

```tsx
import {
  formatDate,
  formatMoney,
  formatNumber,
  formatPercent,
  formatFileSize,
  formatRelativeTime,
  maskPhone,
  maskIdCard,
  maskEmail,
  truncate
} from '@/utils';

formatDate(Date.now()); // '2024-12-09 13:40:00'
formatDate(Date.now(), 'YYYY-MM-DD'); // '2024-12-09'
formatRelativeTime(Date.now() - 60000); // '1分钟前'

formatNumber(12345.678); // '12,345.68'
formatMoney(12345.6); // '¥12,345.60'
formatPercent(0.1234); // '12.34%'
formatFileSize(1024 * 1024); // '1.00 MB'

maskPhone('13800138000'); // '138****8000'
maskIdCard('110101199001011234'); // '110101********1234'
maskEmail('test@example.com'); // 't***t@example.com'
truncate('这是一段很长的文字', 10); // '这是一段很长...'
```

### 公共组件

#### PageContainer - 页面容器

```tsx
import { PageContainer } from '@/components';

const UserList: FC = () => {
  return (
    <PageContainer
      title="用户管理"
      subTitle="管理系统用户"
      breadcrumb={[{ title: '首页', path: '/' }, { title: '用户管理' }]}
      extra={<Button type="primary">新增用户</Button>}
      onRefresh={() => refresh()}
      loading={loading}
    >
      <Table dataSource={data} />
    </PageContainer>
  );
};
```

#### SearchForm - 查询表单

```tsx
import { SearchForm } from '@/components';
import { Form, Input, Select } from 'antd';

const UserList: FC = () => {
  const handleSearch = (values: any) => {
    console.log('查询条件:', values);
  };

  return (
    <SearchForm
      onSearch={handleSearch}
      onReset={() => refresh()}
      loading={loading}
      columns={3} // 每行3列
      defaultCollapseCount={3} // 超过3个折叠
    >
      <Form.Item name="name" label="姓名">
        <Input placeholder="请输入姓名" />
      </Form.Item>
      <Form.Item name="phone" label="手机号">
        <Input placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item name="status" label="状态">
        <Select placeholder="请选择" options={COMMON_STATUS_OPTIONS} />
      </Form.Item>
      <Form.Item name="email" label="邮箱">
        <Input placeholder="请输入邮箱" />
      </Form.Item>
    </SearchForm>
  );
};
```

### 常量使用

```tsx
import {
  STORAGE_KEYS,
  HTTP_STATUS,
  PAGINATION,
  DATE_FORMAT,
  REGEX,
  FILE_TYPES,
  FILE_SIZE_LIMIT,
  COMMON_STATUS,
  COMMON_STATUS_OPTIONS
} from '@/constants';

// 正则验证
REGEX.PHONE.test('13800138000'); // true
REGEX.EMAIL.test('test@test.com'); // true

// 分页配置
PAGINATION.DEFAULT_PAGE_SIZE; // 10

// 日期格式
DATE_FORMAT.DATETIME; // 'YYYY-MM-DD HH:mm:ss'

// 状态选项（可直接用于 Select）
<Select options={COMMON_STATUS_OPTIONS} />;
```

## License

MIT
