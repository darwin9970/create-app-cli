import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 创建axios 实例
const instance:AxiosInstance = axios.create({
    timeout: 3000
});

//请求拦截器
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应response 拦截器
instance.interceptors.response.use(
    (res: AxiosResponse) => {
        const result = res.data;
        return Promise.resolve(result.results);
    },
    (error) => {
        console.log(error);
        return Promise.reject({ 'msg': '请求失败' });
    }
);

const requests:Http.Requests = {
    post<T>(url: string, data: Record<string, T> = {}): Promise<AxiosResponse> {
        return instance.post(url, data);
    },
    get<T>(url: string, params: Record<string, T> = {}): Promise<AxiosResponse> {
        return instance.get(url, { params: params });
    },
    delete<T>(url: string, data: Record<string, T> = {}): Promise<AxiosResponse> {
        return instance.delete(url, { data: data });
    },
    put<T>(url: string, data: Record<string, T> = {}): Promise<AxiosResponse> {
        return instance.put(url, data);
    }
};

export default requests;
