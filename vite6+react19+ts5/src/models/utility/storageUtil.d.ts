
export declare global{
    namespace StorageUtil {
        import { LangEnum } from '@lang/enum.ts';

        interface Util {
            /**
             * @method setLanguage 设置语言
             * @param str language字符串
             * */
            setLanguage: (str: LangEnum) => void,
            /**
             * @method getLanguage 获取语言
             * */
            getLanguage: () => LangEnum
        }
    }
}