import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from "@/pages/Dashboard.vue";
import Auth from '@/pages/Auth.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Dashboard
    },
    {
        path: '/login',
        name: 'auth',
        component: Auth
    }
];

const router = createRouter({
    history: createWebHistory(), // Используйте HTML5 History API
    routes
});

export default router;
