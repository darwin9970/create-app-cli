/**
 * 通用分页请求参数
 */
export interface PaginationParams {
  current?: number;
  pageSize?: number;
}

/**
 * 通用分页响应
 */
export interface PaginationResult<T> {
  list: T[];
  total: number;
  current: number;
  pageSize: number;
}

/**
 * 通用 API 响应
 */
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}
