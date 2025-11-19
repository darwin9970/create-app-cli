import { createI18n, I18n } from 'vue-i18n';
import zhConfig from '@lang/zh_cn';
import enConfig from '@lang/en_us';
import storageUtil from '@utility/storageUtil.ts';
import { LangEnum } from '@lang/enum.ts';

export const i18nLang = {
    [LangEnum.en]: enConfig, //英文
    [LangEnum.zh]: zhConfig //中文
};

const i18n: I18n = createI18n({
    legacy: false,
    locale: storageUtil.getLanguage(),
    messages: i18nLang // 设置资源文件对象
});

export default i18n;