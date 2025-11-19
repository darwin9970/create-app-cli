import { createApp } from 'vue';
//Vant 中有个别组件是以函数的形式提供的,unplugin-vue-components无法自动引入对应的样式，因此需要手动引入样式
import 'vant/es/image-preview/style';
import 'vant/es/toast/style';
//引入i8n
import i18n from '@lang/lang.js';
//全局组件注册
import pinia from '@store/pinia.js';
//状态管理器
import router from '@/router.js';
import App from '@/App.vue';
//引入全局样式文件
import '@/style.scss';

const app = createApp(App);

//全局变量
app.provide('global', {});

app.use(pinia);
app.use(i18n);
app.use(router);

app.mount('#app');
