import { defineMock } from '@umijs/max';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

// Mock 用户数据
const mockUsers = [
  {
    id: '1',
    name: '张三',
    phone: '13800138001',
    email: 'zhangsan@test.com',
    status: 1,
    department: '技术部',
    createTime: '2024-12-01 10:00:00'
  },
  {
    id: '2',
    name: '李四',
    phone: '13800138002',
    email: 'lisi@test.com',
    status: 1,
    department: '产品部',
    createTime: '2024-12-02 11:00:00'
  },
  {
    id: '3',
    name: '王五',
    phone: '13800138003',
    email: 'wangwu@test.com',
    status: 0,
    department: '技术部',
    createTime: '2024-12-03 12:00:00'
  },
  {
    id: '4',
    name: '赵六',
    phone: '13800138004',
    email: 'zhaoliu@test.com',
    status: 1,
    department: '运营部',
    createTime: '2024-12-04 13:00:00'
  },
  {
    id: '5',
    name: '钱七',
    phone: '13800138005',
    email: 'qianqi@test.com',
    status: 0,
    department: '产品部',
    createTime: '2024-12-05 14:00:00'
  },
  {
    id: '6',
    name: '孙八',
    phone: '13800138006',
    email: 'sunba@test.com',
    status: 1,
    department: '技术部',
    createTime: '2024-12-06 15:00:00'
  },
  {
    id: '7',
    name: '周九',
    phone: '13800138007',
    email: 'zhoujiu@test.com',
    status: 1,
    department: '运营部',
    createTime: '2024-12-07 16:00:00'
  },
  {
    id: '8',
    name: '吴十',
    phone: '13800138008',
    email: 'wushi@test.com',
    status: 0,
    department: '产品部',
    createTime: '2024-12-08 17:00:00'
  }
];

export default defineMock({
  'POST /api/auth/login': async (req, res) => {
    const { password, username } = req.body;
    await waitTime(1000);

    if (password === '123456' && username === 'admin') {
      res.json({
        success: true,
        code: 200,
        data: {
          id: '1',
          name: 'Admin',
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          token: 'mock-token-admin',
          roles: ['admin'],
          permissions: [
            'dashboard.analysis.view',
            'dashboard.workplace.view',
            'system.user.view',
            'system.role.view',
            'system.settings.view'
          ]
        },
        message: '登录成功'
      });
      return;
    }

    if (password === '123456' && username === 'user') {
      res.json({
        success: true,
        code: 200,
        data: {
          id: '2',
          name: 'User',
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          token: 'mock-token-user',
          roles: ['user'],
          permissions: ['dashboard.analysis.view']
        },
        message: '登录成功'
      });
      return;
    }

    res.json({
      success: false,
      code: 400,
      data: null,
      message: '用户名或密码错误(admin/123456)'
    });
  },

  'POST /api/auth/logout': (req, res) => {
    res.json({
      success: true,
      code: 200,
      data: null,
      message: '退出成功'
    });
  },

  // 获取用户列表
  'GET /api/user/list': async (req, res) => {
    await waitTime(500);

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

    const {
      name,
      phone,
      department,
      status,
      startTime,
      endTime,
      current = 1,
      pageSize = 10
    } = req.query as any;

    let list = [...mockUsers];

    // 筛选
    if (name) {
      list = list.filter((item) => item.name.includes(name));
    }
    if (phone) {
      list = list.filter((item) => item.phone.includes(phone));
    }
    if (department) {
      list = list.filter((item) => item.department === department);
    }
    if (status !== undefined && status !== '') {
      list = list.filter((item) => item.status === Number(status));
    }
    // 日期范围筛选
    if (startTime && endTime) {
      list = list.filter((item) => {
        const createDate = item.createTime.split(' ')[0]; // 获取日期部分 YYYY-MM-DD
        return createDate >= startTime && createDate <= endTime;
      });
    }

    // 分页
    const start = (Number(current) - 1) * Number(pageSize);
    const end = start + Number(pageSize);
    const pageList = list.slice(start, end);

    res.json({
      success: true,
      code: 200,
      data: {
        list: pageList,
        total: list.length,
        current: Number(current),
        pageSize: Number(pageSize)
      },
      message: 'success'
    });
  },

  // 删除用户
  'DELETE /api/user/:id': async (req, res) => {
    await waitTime(300);
    const { id } = req.params;
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index > -1) {
      // 实际场景应删除数据，mock 这里仅演示成功响应
      // mockUsers.splice(index, 1);
    }
    res.json({
      success: true,
      code: 200,
      message: '删除成功'
    });
  }
});
