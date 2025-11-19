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
        post: (url: string, data?: Record<string, unknown>) => Promise<AxiosResponse>;
        /**
         * @method get 发送get请求
         * @param url 请求url
         * @param params 请求参数
         * */
        get: (url: string, params?: Record<string, unknown>) => Promise<AxiosResponse>;
        /**
         * @method delete 发送get请求
         * @param url 请求url
         * @param data 请求参数
         * */
        delete: (url: string, data?: Record<string, unknown>) => Promise<AxiosResponse>;
        /**
         * @method post 发送post请求
         * @param url 请求url
         * @param data 请求参数
         * */
        put: (url: string, data?: Record<string, unknown>) => Promise<AxiosResponse>;
    }
}