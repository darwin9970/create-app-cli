import { defineConfig } from '@umijs/max';

/**
 * 生产环境配置
 */
export default defineConfig({
  define: {
    'process.env.UMI_ENV': 'prod',
    'process.env.API_BASE_URL': 'https://api.example.com/api'
  },
  // 生产环境关闭 mock
  mock: false,
  // 生产环境优化
  deadCode: {},
  // 代码分割
  codeSplitting: {
    jsStrategy: 'granularChunks'
  }
});
