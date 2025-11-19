/**
 * @interface ImportMetaEnv 环境变量类型
 * @property [key: string] 未知属性
 * @property BASE_URL 基础路径
 * @property MODE 模式
 * @property DEV 是否开发环境
 * @property PROD 是否生产环境
 * @property SSR 是否服务端渲染
 * */
interface ImportMetaEnv {
    [key: string]: never
    BASE_URL: string
    MODE: string
    DEV: boolean
    PROD: boolean
    SSR: boolean
}
