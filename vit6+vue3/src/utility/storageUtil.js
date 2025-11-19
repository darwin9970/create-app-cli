import { langEnum } from '@lang/enum.js';

let storageUtil = {};

/**
 * @method setLanguage 设置语言
 * @param str {String} language字符串
 * */
storageUtil.setLanguage = (str) => {
    localStorage.setItem('language', str);
};

/**
 * @method getLanguage 获取语言
 * @returns {String}
 * */
storageUtil.getLanguage = () => {
    return localStorage.getItem('language') || langEnum.zh;
};

export default storageUtil;
