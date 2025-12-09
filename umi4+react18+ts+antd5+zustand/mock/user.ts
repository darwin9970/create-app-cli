import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const login = async (req: Request, res: Response) => {
  const { password, username } = req.body;
  await waitTime(1000);

  if (password === '123456' && username === 'admin') {
    res.send({
      code: 200,
      data: {
        id: '1',
        name: 'Admin',
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        token: 'mock-token-admin',
        roles: ['admin']
      },
      message: '登录成功'
    });
    return;
  }

  if (password === '123456' && username === 'user') {
    res.send({
      code: 200,
      data: {
        id: '2',
        name: 'User',
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        token: 'mock-token-user',
        roles: ['user']
      },
      message: '登录成功'
    });
    return;
  }

  res.send({
    code: 401,
    data: null,
    message: '用户名或密码错误(admin/123456)'
  });
};

const logout = (req: Request, res: Response) => {
  res.send({
    code: 200,
    data: null,
    message: '退出成功'
  });
};

export default {
  'POST /api/auth/login': login,
  'POST /api/auth/logout': logout
};
