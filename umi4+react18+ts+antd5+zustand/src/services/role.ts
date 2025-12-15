import type { ApiResponse } from '@/types';
import request from '@/utils/request';

export interface RoleRecord {
  id: string;
  name: string;
  code: string;
  description: string;
  status: number;
  createTime: string;
}

export interface RoleListParams {
  current?: number;
  pageSize?: number;
  name?: string;
  status?: number;
}

export interface RoleListResult {
  list: RoleRecord[];
  total: number;
}

/**
 * 获取角色列表
 */
export async function getRoleList(params?: RoleListParams) {
  return request.get<ApiResponse<RoleListResult>>('/api/role/list', params);
}

/**
 * 创建角色
 */
export async function createRole(data: Partial<RoleRecord>) {
  return request.post<ApiResponse<null>>('/api/role/create', data);
}

/**
 * 更新角色
 */
export async function updateRole(id: string, data: Partial<RoleRecord>) {
  return request.put<ApiResponse<null>>(`/api/role/${id}`, data);
}

/**
 * 删除角色
 */
export async function deleteRole(id: string) {
  return request.delete<ApiResponse<null>>(`/api/role/${id}`);
}
