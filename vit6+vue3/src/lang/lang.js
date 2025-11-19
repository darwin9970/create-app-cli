import { createI18n } from 'vue-i18n';
import storageUtil from '@utility/storageUtil.js';
import { langEnum } from '@lang/enum.js';
import zhConfig from '@lang/zh_cn.js';
import enConfig from '@lang/en_us.js';

export const i18nLang = {
    [langEnum.en]: enConfig,//英文
    [langEnum.zh]: zhConfig//中文
};

let i18n = createI18n({
    legacy: false,
    locale: storageUtil.getLanguage(),
    messages: i18nLang // 设置资源文件对象
});

export default i18n;