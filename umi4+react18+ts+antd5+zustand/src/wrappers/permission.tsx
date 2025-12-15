import type { MenuItem } from '@/services/menu';
import { useMenuStore } from '@/stores';
import { history, Outlet, useAccess, useLocation } from '@umijs/max';
import { Button, Result, Spin } from 'antd';
import { FC, useMemo } from 'react';

const pathPermissionMap: Record<string, string> = {
  '/dashboard/analysis': 'dashboard.analysis.view',
  '/dashboard/workplace': 'dashboard.workplace.view',
  '/system/user': 'system.user.view',
  '/system/role': 'system.role.view',
  '/system/settings': 'system.settings.view',
  '/data/list': 'data.list.view',
  '/data/import': 'data.import.view'
};

function findMenuByPath(menus: MenuItem[], path: string): MenuItem | null {
  for (const m of menus) {
    if (m.path === path) return m;
    if (m.routes && m.routes.length > 0) {
      const hit = findMenuByPath(m.routes, path);
      if (hit) return hit;
    }
  }
  return null;
}

const PermissionWrapper: FC = () => {
  const location = useLocation();
  const menus = useMenuStore((state) => state.menus);
  const loaded = useMenuStore((state) => state.loaded);
  const access = useAccess() as unknown as {
    hasPermission?: (perm: string) => boolean;
  };

  const perm = useMemo(() => {
    const matched = findMenuByPath(menus, location.pathname);
    return matched?.access || pathPermissionMap[location.pathname];
  }, [menus, location.pathname]);

  if (!loaded) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }

  if (perm && access?.hasPermission && !access.hasPermission(perm)) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，您没有权限访问该页面"
        extra={
          <Button type="primary" onClick={() => history.replace('/')}>
            返回首页
          </Button>
        }
      />
    );
  }

  return <Outlet />;
};

export default PermissionWrapper;
