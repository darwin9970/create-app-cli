import { defineMock } from '@umijs/max';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const adminMenus = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'DashboardOutlined',
    routes: [
      {
        path: '/dashboard/analysis',
        name: '分析页',
        component: './Dashboard/Analysis',
        access: 'dashboard.analysis.view'
      },
      {
        path: '/dashboard/workplace',
        name: '工作台',
        component: './Dashboard/Workplace',
        access: 'dashboard.workplace.view'
      }
    ]
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'SettingOutlined',
    routes: [
      {
        path: '/system/user',
        name: '用户管理',
        component: './System/User',
        access: 'system.user.view'
      },
      {
        path: '/system/role',
        name: '角色管理',
        component: './System/Role',
        access: 'system.role.view'
      },
      {
        path: '/system/settings',
        name: '系统设置',
        component: './System/Settings',
        access: 'system.settings.view'
      }
    ]
  }
];

const userMenus = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'DashboardOutlined',
    routes: [
      {
        path: '/dashboard/analysis',
        name: '数据分析',
        icon: 'BarChartOutlined',
        component: './Dashboard/Analysis',
        access: 'dashboard.analysis.view'
      }
    ]
  }
];

export default defineMock({
  'GET /api/menu/list': async (req, res) => {
    await waitTime(300);

    // 从 token 判断用户角色
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token || token.includes('expired')) {
      res.status(401).json({
        success: false,
        code: 401,
        data: null,
        message: 'Unauthorized'
      });
      return;
    }

    const isAdmin = token?.includes('admin') || false;

    // 根据角色返回不同菜单
    const menus = isAdmin ? adminMenus : userMenus;

    res.json({
      success: true,
      code: 200,
      data: menus,
      message: 'success'
    });
  }
});
