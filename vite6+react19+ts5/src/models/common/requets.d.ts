export declare global{
    namespace Http {
        import { AxiosResponse } from 'axios';

        /**
         * @interface Requests 请求接口
         * */
        interface Requests {
            /**
             * @method post 发送post请求
             * @param url 请求url
             * @param data 请求参数
             * */
            post: <T = unknown>(url: string, data?: Record<string, T>) => Promise<AxiosResponse>;
            /**
             * @method get 发送get请求
             * @param url 请求url
             * @param params 请求参数
             * */
            get: <T = unknown>(url: string, params?: Record<string, T>) => Promise<AxiosResponse>;
            /**
             * @method delete 发送get请求
             * @param url 请求url
             * @param data 请求参数
             * */
            delete: <T = unknown>(url: string, data?: Record<string, T>) => Promise<AxiosResponse>;
            /**
             * @method post 发送post请求
             * @param url 请求url
             * @param data 请求参数
             * */
            put: <T = unknown>(url: string, data?: Record<string, T>) => Promise<AxiosResponse>;
        }
    }
}