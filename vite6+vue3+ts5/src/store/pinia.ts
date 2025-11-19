import { createPinia, Pinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

const pinia: Pinia = createPinia();

//使用持久化插件
pinia.use(piniaPersist);

export default pinia;