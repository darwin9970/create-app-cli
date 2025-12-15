import { MenuItem } from '@/services/menu';
import { useMenuStore } from '@/stores';
import { getComponent } from '@/utils/routes';
import { history, useLocation } from '@umijs/max';
import { Result, Spin } from 'antd';
import { FC, useMemo } from 'react';

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

function getFirstAvailablePath(menus: MenuItem[]): string | null {
  const first = menus.find((m) => !!m.path);
  if (!first) return null;
  if (first.redirect) return first.redirect;
  if (first.routes && first.routes.length > 0) {
    return first.routes[0]?.path ?? first.path;
  }
  return first.path;
}

const DynamicPage: FC = () => {
  const location = useLocation();
  const menus = useMenuStore((state) => state.menus);
  const loaded = useMenuStore((state) => state.loaded);

  const currentPath = location.pathname;

  const matched = useMemo(
    () => findMenuByPath(menus, currentPath),
    [menus, currentPath]
  );

  if (!loaded) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }

  if (currentPath === '/' && menus.length > 0) {
    const to = getFirstAvailablePath(menus);
    if (to && to !== '/') {
      history.replace(to);
      return null;
    }
  }

  if (matched?.redirect) {
    history.replace(matched.redirect);
    return null;
  }

  if (matched?.component) {
    const componentName = matched.component.replace(/^\.\//, '');
    const Component = getComponent(componentName);
    if (Component) {
      return <Component />;
    }
  }

  return (
    <Result status="404" title="404" subTitle="抱歉，您访问的页面不存在" />
  );
};

export default DynamicPage;
