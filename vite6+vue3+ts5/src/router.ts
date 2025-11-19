import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import Home from '@pages/home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        component: Home
    }
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;