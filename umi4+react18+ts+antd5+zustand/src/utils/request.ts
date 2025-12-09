import { message } from '@/hooks/useAppMessage';
import type {
  AxiosRequestConfig,
  AxiosResponse,
  RequestConfig,
  RequestOptions
} from '@umijs/max';
import { request as umiRequest } from '@umijs/max';

// 请求拦截器
const requestInterceptors: RequestConfig['requestInterceptors'] = [
  (config: AxiosRequestConfig) => {
    // 可在此添加 token 等
    const token = localStorage.getItem('token');
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
    message.error('请求失败');
    return Promise.reject({ msg: '请求失败' });
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
  post<T>(url: string, data?: object, options?: RequestOptions): Promise<T> {
    return umiRequest(url, { method: 'POST', data, ...options });
  },
  get<T>(url: string, params?: object, options?: RequestOptions): Promise<T> {
    return umiRequest(url, { method: 'GET', params, ...options });
  },
  delete<T>(url: string, data?: object, options?: RequestOptions): Promise<T> {
    return umiRequest(url, { method: 'DELETE', data, ...options });
  },
  put<T>(url: string, data?: object, options?: RequestOptions): Promise<T> {
    return umiRequest(url, { method: 'PUT', data, ...options });
  }
};

export default requests;
