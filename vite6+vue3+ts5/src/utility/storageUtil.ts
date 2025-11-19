import { LangEnum } from '@lang/enum.ts';

let storageUtil: StorageUtil.Util = {} as StorageUtil.Util;

/**
 * @method setLanguage 设置语言
 * @param str {LangEnum} language字符串
 * */
storageUtil.setLanguage = (str: LangEnum): void => {
    localStorage.setItem('language', str);
};

/**
 * @method getLanguage 获取语言
 * @returns {LangEnum}
 * */
storageUtil.getLanguage = (): LangEnum => {
    return localStorage.getItem('language') as LangEnum || LangEnum.zh;
};

export default storageUtil;
