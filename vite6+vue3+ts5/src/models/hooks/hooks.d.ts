

namespace Hooks {
    import { Ref } from 'vue';

    /**
     * @interface Env 环境配置接口
     * @template envName 环境名称
     * @template dateFormat 日期格式化
     * @template theme 主题配置
     * */
    interface Env {
        envName: string;
        theme: Ref<Record<string, string>>
    }

}