// 运行时配置
import { useMenuStore, useUserStore } from '@/stores';
import { requestConfig } from '@/utils/request';
import { menuToRoutes } from '@/utils/routes';
import { getMenus, MenuItem, UserInfo } from './services';

export interface InitialState {
  userInfo?: UserInfo | null;
  menus?: MenuItem[];
}

// 请求配置
export const request = requestConfig;

// 动态路由存储
let extraRoutes: any[] = [];

/**
 * 修改客户端路由
 */
export function patchClientRoutes({ routes }: { routes: any[] }) {
  if (extraRoutes.length === 0) return;

  // 找到 BasicLayout 下的 auth wrapper
  const layoutRoute = routes.find((r) => r.path === '/');
  if (layoutRoute?.children) {
    // UmiJS 4 内部使用 children 而不是 routes
    const authRoute = layoutRoute.children.find(
      (r: any) => r.path === '/' && (r.children || r.routes)
    );
    if (authRoute) {
      authRoute.children = [...extraRoutes, ...(authRoute.children || [])];
    }
  } else if (layoutRoute?.routes) {
    const authRoute = layoutRoute.routes.find(
      (r: any) => r.path === '/' && r.routes
    );
    if (authRoute) {
      authRoute.routes = [...extraRoutes, ...(authRoute.routes || [])];
    }
  }
}

/**
 * 全局初始化数据
 */
export async function getInitialState(): Promise<InitialState> {
  const userInfo = useUserStore.getState().userInfo;
  const menus = useMenuStore.getState().menus;
  return { userInfo, menus };
}

/**
 * 渲染前获取菜单并生成路由
 */
export function render(oldRender: () => void) {
  const userInfo = useUserStore.getState().userInfo;

  if (userInfo?.token) {
    getMenus()
      .then((res) => {
        if (res?.data) {
          useMenuStore.getState().setMenus(res.data);
          extraRoutes = menuToRoutes(res.data);
        }
        oldRender();
      })
      .catch(() => {
        oldRender();
      });
  } else {
    oldRender();
  }
}
