import { defineConfig } from '@umijs/max';

/**
 * 开发环境配置
 */
export default defineConfig({
  define: {
    'process.env.UMI_ENV': 'dev',
    'process.env.API_BASE_URL': 'http://localhost:8080/api',
    CHECK_TIMEOUT: 10
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  },
  // 开发环境开启 mock
  mock: {}
});
