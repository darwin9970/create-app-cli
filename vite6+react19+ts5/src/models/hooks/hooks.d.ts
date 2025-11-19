
export declare global{
    namespace Hooks {
        /**
         * @interface Env 环境配置接口
         * @template theme 主题配置
         * @template node 开发环境
         * */
        interface Env {
            theme: Record<string, string>;
            envName: string
        }
    }
}