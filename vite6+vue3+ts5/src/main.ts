import { createApp } from 'vue';
import lang from '@lang/lang';
import pinia from '@store/pinia';
import router from '@/router';
import App from '@/App.vue';
import '@/style.scss';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(lang);

app.mount('#app');
