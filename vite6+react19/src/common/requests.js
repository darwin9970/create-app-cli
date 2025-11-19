import axios from 'axios';
// 创建axios 实例
const instance = axios.create({
    timeout: 3000
});
//请求拦截器
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// 响应response 拦截器
instance.interceptors.response.use(
    (res) => {
        const result = res.data;
        return Promise.resolve(result.results);
    },
    (err) => {
        return Promise.reject({ 'msg':'请求失败' });
    }
);
const requests = {
    post(url, data = {}, config = {}) {
        return instance.post(url, data, config);
    },
    get(url, params = {}) {
        return instance.get(url, { params: params });
    },
    delete(url, data = {}) {
        return instance.delete(url, { data: data });
    },
    put(url, data = {}) {
        return instance.put(url, data);
    }
};

export default requests;
