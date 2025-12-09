import type { UserInfo } from '@/services';

/**
 * 权限定义
 * @see https://umijs.org/docs/max/access
 */
export default (initialState: { userInfo?: UserInfo | null } = {}) => {
  const { userInfo } = initialState;

  return {
    // 是否已登录
    isLogin: !!userInfo?.token,
    // 是否管理员（根据实际业务调整）
    isAdmin: userInfo?.id === 'admin'
  };
};
