import { useUserStore } from '@/stores';
import { Navigate, Outlet } from '@umijs/max';
import { FC } from 'react';

/**
 * 路由鉴权 wrapper
 * 用于保护需要登录才能访问的路由
 */
const AuthWrapper: FC = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const isLogin = !!userInfo?.token;

  if (isLogin) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default AuthWrapper;
