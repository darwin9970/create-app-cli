import { defineConfig } from '@umijs/max';
import routes from './routes';

/**
 * 基础配置（所有环境共享）
 * @see https://umijs.org/docs/api/config
 */
export default defineConfig({
  hash: true,
  history: {
    type: 'hash'
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  tailwindcss: {},
  // 关闭内置 layout，使用自定义布局
  layout: false,
  mfsu: {
    strategy: 'normal'
  },
  esbuildMinifyIIFE: true,
  routes,
  npmClient: 'pnpm'
});
