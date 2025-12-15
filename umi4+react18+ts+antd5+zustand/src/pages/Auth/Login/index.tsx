import { getMenus, login } from '@/services';
import { useMenuStore, useUserStore } from '@/stores';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history, useLocation, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App } from 'antd';
import { FC } from 'react';

interface LoginParams {
  username: string;
  password: string;
}

const LoginContent: FC = () => {
  const { message } = App.useApp();
  const location = useLocation();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const setMenus = useMenuStore((state) => state.setMenus);
  const { refresh } = useModel('@@initialState');

  const { run: handleLogin, loading } = useRequest(login, {
    manual: true,
    onSuccess: async (res) => {
      if (res.data) {
        setUserInfo(res.data);
      }
      message.success('登录成功');

      const urlParams = new URLSearchParams(location.search);
      const redirect = urlParams.get('redirect') || '/';

      try {
        const menuRes = await getMenus();
        if (menuRes?.data) {
          setMenus(menuRes.data);
        } else {
          setMenus([]);
        }
      } catch (e) {
        console.error('获取菜单失败', e);
        setMenus([]);
        message.error('获取菜单失败');
      }

      await refresh();

      history.replace(redirect);
    },
    onError: (error: Error) => {
      message.error(error.message || '登录失败，请重试');
    }
  });

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <LoginForm
        title="Data Center"
        subTitle="数据中心管理系统"
        submitter={{
          submitButtonProps: {
            loading,
            size: 'large',
            style: {
              width: '100%'
            }
          }
        }}
        onFinish={async (values) => {
          handleLogin(values as LoginParams);
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined />
          }}
          placeholder="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />
          }}
          placeholder="密码"
          rules={[{ required: true, message: '请输入密码' }]}
        />
      </LoginForm>
    </div>
  );
};

const Login: FC = () => {
  return (
    <App>
      <LoginContent />
    </App>
  );
};

export default Login;
