import type { UserInfo } from '@/services';

/**
 * 权限定义
 * @see https://umijs.org/docs/max/access
 */
export default (initialState: { userInfo?: UserInfo | null } = {}) => {
  const { userInfo } = initialState;

  const isAdmin = !!userInfo?.roles?.includes('admin');
  const permissionSet = new Set(userInfo?.permissions ?? []);

  return {
    // 是否已登录
    isLogin: !!userInfo?.token,
    // 是否管理员（根据实际业务调整）
    isAdmin,
    hasPermission: (perm: string) => {
      if (!perm) return true;
      if (isAdmin) return true;
      return permissionSet.has(perm);
    }
  };
};
