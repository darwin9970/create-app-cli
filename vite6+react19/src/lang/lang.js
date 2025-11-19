import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import storageUtil from '@utility/storageUtil.js';
import { langEnum } from '@lang/enum.js';
import en_us from '@/lang/en_us.js';
import zh_cn from '@/lang/zh_cn.js';

export const changeLanguage = (events)=>{
    const lang = events.target.value;
    storageUtil.setLanguage(lang);
    i18n.changeLanguage(lang);
};

const resources = {
    [langEnum.zh]: {
        translation: zh_cn
    },
    [langEnum.en]: {
        translation: en_us
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: storageUtil.getLanguage(),
    fallbackLng: langEnum.zh,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
