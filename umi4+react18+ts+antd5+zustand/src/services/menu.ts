import { ApiResponse } from '@/types';
import request from '@/utils/request';

/**
 * 菜单/路由项类型
 */
export interface MenuItem {
  /** 路由路径 */
  path: string;
  /** 菜单名称 */
  name: string;
  /** 图标名称 */
  icon?: string;
  /** 页面组件路径 */
  component?: string;
  /** 重定向地址 */
  redirect?: string;
  /** 子路由 */
  routes?: MenuItem[];
  /** 是否隐藏菜单 */
  hideInMenu?: boolean;
  /** 权限标识 */
  access?: string;
}

/**
 * 获取用户菜单/路由
 */
export async function getMenus() {
  return request.get<ApiResponse<MenuItem[]>>('/api/menu/list');
}
