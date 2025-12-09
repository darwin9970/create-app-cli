export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        path: '/',
        wrappers: ['@/wrappers/auth'],
        routes: [
          {
            path: '/',
            redirect: '/dashboard/analysis'
          },
          {
            path: '/dashboard/analysis',
            component: './Dashboard/Analysis'
          },
          {
            path: '/system/settings',
            component: './System/Settings'
          }
        ]
      },
      {
        path: '*',
        component: './Exception/404'
      }
    ]
  },
  {
    path: '/login',
    component: './Auth/Login'
  },
  {
    path: '*',
    component: './Exception/404'
  }
];
