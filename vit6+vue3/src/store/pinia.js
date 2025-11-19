import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

const pinia = createPinia();
pinia.use(piniaPersist); //使用持久化插件

export default pinia;