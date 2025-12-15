import { STORAGE_KEYS } from '@/constants';
import { message } from '@/hooks/useAppMessage';
import { useUserStore } from '@/stores';
import type {
  AxiosRequestConfig,
  AxiosResponse,
  RequestConfig,
  RequestOptions
} from '@umijs/max';
import { history, request as umiRequest } from '@umijs/max';

type AnyObject = Record<string, unknown>;

function safeMessageError(content: string) {
  const fn = (message as any)?.error;
  if (typeof fn === 'function') {
    fn(content);
  }
}

function getRedirectPath() {
  const hash = window.location.hash || '';
  const path = hash.startsWith('#') ? hash.slice(1) : hash;
  return path || '/';
}

function normalizeBizError(res: AnyObject) {
  const msg =
    (res.message as string) || ((res as any).msg as string) || '请求失败';
  const err = new Error(msg);
  (err as any).code = (res.code as number) ?? undefined;
  (err as any).success = (res as any).success;
  return err;
}

function isBizSuccess(res: AnyObject) {
  if (Object.prototype.hasOwnProperty.call(res, 'success')) {
    return (res as any).success === true;
  }
  if (Object.prototype.hasOwnProperty.call(res, 'code')) {
    return (res as any).code === 200;
  }
  return false;
}

// 请求拦截器
const requestInterceptors: RequestConfig['requestInterceptors'] = [
  (config: AxiosRequestConfig) => {
    // 可在此添加 token 等
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
];

// 响应拦截器
const responseInterceptors: RequestConfig['responseInterceptors'] = [
  (response: AxiosResponse) => {
    return response;
  }
];

// 错误处理
const errorConfig: RequestConfig['errorConfig'] = {
  errorHandler: (error) => {
    console.error(error);

    const status =
      (error as any)?.response?.status ??
      (error as any)?.response?.statusCode ??
      (error as any)?.status;

    if (status === 401) {
      try {
        useUserStore.getState().clearUser();
      } catch (e) {
        console.error(e);
      }

      const redirect = getRedirectPath();
      if (!redirect.startsWith('/login')) {
        history.replace(`/login?redirect=${encodeURIComponent(redirect)}`);
      }
      safeMessageError('登录已过期，请重新登录');
      return Promise.reject(new Error('Unauthorized'));
    }

    safeMessageError('请求失败');
    const err = error instanceof Error ? error : new Error('请求失败');
    return Promise.reject(err);
  },
  errorThrower: () => {}
};

// 导出 requestConfig 供 app.ts 使用
export const requestConfig: RequestConfig = {
  timeout: 3000,
  requestInterceptors,
  responseInterceptors,
  errorConfig
};

// 封装请求方法
const requests = {
  async post<T>(
    url: string,
    data?: object,
    options?: RequestOptions
  ): Promise<T> {
    const res = (await umiRequest(url, {
      method: 'POST',
      data,
      ...options
    })) as AnyObject;
    if (isBizSuccess(res)) return res as unknown as T;
    safeMessageError((res.message as string) || '请求失败');
    throw normalizeBizError(res);
  },
  async get<T>(
    url: string,
    params?: object,
    options?: RequestOptions
  ): Promise<T> {
    const res = (await umiRequest(url, {
      method: 'GET',
      params,
      ...options
    })) as AnyObject;
    if (isBizSuccess(res)) return res as unknown as T;
    safeMessageError((res.message as string) || '请求失败');
    throw normalizeBizError(res);
  },
  async delete<T>(
    url: string,
    data?: object,
    options?: RequestOptions
  ): Promise<T> {
    const res = (await umiRequest(url, {
      method: 'DELETE',
      data,
      ...options
    })) as AnyObject;
    if (isBizSuccess(res)) return res as unknown as T;
    safeMessageError((res.message as string) || '请求失败');
    throw normalizeBizError(res);
  },
  async put<T>(
    url: string,
    data?: object,
    options?: RequestOptions
  ): Promise<T> {
    const res = (await umiRequest(url, {
      method: 'PUT',
      data,
      ...options
    })) as AnyObject;
    if (isBizSuccess(res)) return res as unknown as T;
    safeMessageError((res.message as string) || '请求失败');
    throw normalizeBizError(res);
  }
};

export default requests;
