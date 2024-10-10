import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { Modal } from 'ant-design-vue';

import App from './App.vue'
import router from './router'; // Импортируйте роутер


import './index.css'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(Modal);
app.use(router);
app.mount('#app');
