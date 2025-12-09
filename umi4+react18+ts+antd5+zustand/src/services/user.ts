import type { ApiResponse } from '@/types';
import request from '@/utils/request';

export interface LoginParams {
  username: string;
  password: string;
}

export interface UserInfo {
  id: string;
  name: string;
  avatar?: string;
  token: string;
  roles?: string[];
}

export interface UserListParams {
  current?: number;
  pageSize?: number;
  keyword?: string;
}

/**
 * 用户登录
 */
export async function login(params: LoginParams) {
  return request.post<ApiResponse<UserInfo>>('/api/auth/login', params);
}

/**
 * 用户登出
 */
export async function logout() {
  return request.post<ApiResponse<null | unknown>>('/api/auth/logout');
}

/**
 * 获取当前用户信息
 */
export async function getCurrentUser() {
  return request.get<ApiResponse<UserInfo>>('/api/user/current');
}

/**
 * 获取用户列表
 */
export async function getUserList(params: UserListParams) {
  return request.get<ApiResponse<{ list: UserInfo[]; total: number }>>(
    '/api/user/list',
    params
  );
}

/**
 * 创建用户
 */
export async function createUser(data: Partial<UserInfo>) {
  return request.post<ApiResponse<UserInfo>>('/api/user/create', data);
}

/**
 * 更新用户
 */
export async function updateUser(id: string, data: Partial<UserInfo>) {
  return request.put<ApiResponse<UserInfo>>(`/api/user/${id}`, data);
}

/**
 * 删除用户
 */
export async function deleteUser(id: string) {
  return request.delete<ApiResponse<null>>(`/api/user/${id}`);
}
