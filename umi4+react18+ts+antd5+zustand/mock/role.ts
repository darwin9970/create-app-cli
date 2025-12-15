import { defineMock } from '@umijs/max';

const roles = [
  {
    id: '1',
    name: '管理员',
    code: 'admin',
    description: '系统管理员，拥有所有权限',
    status: 1,
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: '2',
    name: '普通用户',
    code: 'user',
    description: '普通用户，仅拥有基本权限',
    status: 1,
    createTime: '2024-01-01 12:00:00'
  },
  {
    id: '3',
    name: '访客',
    code: 'guest',
    description: '访客，仅拥有查看权限',
    status: 0,
    createTime: '2024-01-02 10:00:00'
  }
];

export default defineMock({
  'GET /api/role/list': (req, res) => {
    res.json({
      success: true,
      data: {
        list: roles,
        total: roles.length
      }
    });
  },

  'POST /api/role/create': (req, res) => {
    res.json({
      success: true,
      message: '创建成功'
    });
  },

  'PUT /api/role/:id': (req, res) => {
    res.json({
      success: true,
      message: '更新成功'
    });
  },

  'DELETE /api/role/:id': (req, res) => {
    res.json({
      success: true,
      message: '删除成功'
    });
  }
});
