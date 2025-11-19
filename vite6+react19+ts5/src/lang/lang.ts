import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import storageUtil from '@utility/storageUtil.ts';
import { LangEnum } from '@lang/enum.ts';
import en_us from '@lang/en_us.ts';
import zh_cn from '@lang/zh_cn.ts';

export const changeLanguage = (lang:LangEnum):void =>{
    storageUtil.setLanguage(lang);
    i18n.changeLanguage(lang);
};

const resources:Resource = {
    [LangEnum.zh]: {
        translation: zh_cn
    },
    [LangEnum.en]: {
        translation: en_us
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: storageUtil.getLanguage(),
    fallbackLng: LangEnum.zh,
    interpolation: {
        escapeValue: false
    }
});
export default i18n;
