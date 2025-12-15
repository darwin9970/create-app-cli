import DashboardAnalysis from '@/pages/Dashboard/Analysis';
import DashboardWorkplace from '@/pages/Dashboard/Workplace';
import DataImport from '@/pages/Data/Import';
import DataList from '@/pages/Data/List';
import SystemRole from '@/pages/System/Role';
import SystemSettings from '@/pages/System/Settings';
import SystemUser from '@/pages/System/User';
import { MenuItem } from '@/services/menu';
import { history } from '@umijs/max';
import React, { useEffect } from 'react';

/**
 * 重定向组件
 */
const Redirect: React.FC<{ to: string }> = ({ to }) => {
  useEffect(() => {
    history.replace(to);
  }, [to]);
  return null;
};

/**
 * 页面组件映射表
 * key: 后端返回的组件名称
 * value: 组件
 *
 * 新增页面时需要在这里注册
 */
const componentMap: Record<string, React.ComponentType<any>> = {
  // Dashboard 模块
  'Dashboard/Analysis': DashboardAnalysis,
  'Dashboard/Workplace': DashboardWorkplace,

  // System 模块
  'System/Settings': SystemSettings,
  'System/User': SystemUser,
  'System/Role': SystemRole,

  // Data 模块
  'Data/List': DataList,
  'Data/Import': DataImport
};

/**
 * 根据组件名称获取组件
 */
export function getComponent(name: string): React.ComponentType<any> | null {
  const Component = componentMap[name];
  if (!Component) {
    console.warn(`[Routes] 未找到组件: ${name}，请在 componentMap 中注册`);
    return null;
  }
  return Component;
}

/**
 * 将后端菜单数据转换为前端路由配置（展平结构）
 * UmiJS 需要将子路由展平到同一层级
 */
export function menuToRoutes(menus: MenuItem[]): any[] {
  const routes: any[] = [];

  const flatten = (items: MenuItem[]) => {
    items.forEach((menu) => {
      // 处理重定向
      if (menu.redirect) {
        routes.push({
          path: menu.path,
          element: <Redirect to={menu.redirect} />
        });
        return;
      }

      // 处理有组件的路由
      if (menu.component) {
        const componentName = menu.component.replace(/^\.\//, '');
        const Component = getComponent(componentName);

        if (Component) {
          routes.push({
            path: menu.path,
            name: menu.name,
            permission: menu.access,
            element: <Component />
          });
        }
      }

      // 递归处理子路由
      if (menu.routes && menu.routes.length > 0) {
        flatten(menu.routes);
      }
    });
  };

  flatten(menus);
  if (process.env.UMI_ENV === 'dev') {
    console.log('[Routes] 生成的路由:', routes);
  }
  return routes;
}
