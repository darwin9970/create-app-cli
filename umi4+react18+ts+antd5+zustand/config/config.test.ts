import { defineConfig } from '@umijs/max';

/**
 * 测试环境配置
 */
export default defineConfig({
  define: {
    'process.env.UMI_ENV': 'test',
    'process.env.API_BASE_URL': 'https://test-api.example.com/api'
  },
  proxy: {
    '/api': {
      target: 'https://test-api.example.com',
      changeOrigin: true
    }
  },
  // 测试环境关闭 mock
  mock: false
});
