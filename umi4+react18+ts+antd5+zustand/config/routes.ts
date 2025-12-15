/**
 * 基础路由配置
 * 动态路由通过 patchClientRoutes 注入到 auth wrapper 下
 */
export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        path: '/',
        wrappers: ['@/wrappers/auth', '@/wrappers/permission'],
        routes: [
          // 动态路由会注入到这里
          { path: '/', component: './DynamicPage' },
          { path: '*', component: './DynamicPage' }
        ]
      },
      { path: '*', component: './Exception/404' }
    ]
  },
  { path: '/login', component: './Auth/Login' },
  { path: '*', component: './Exception/404' }
];
