import { createApp } from 'vue'
import App from './App.vue'
import { Modal } from 'ant-design-vue';
import router from './router'; // Импортируйте роутер

import './index.css'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(Modal);
app.use(router);
app.mount('#app');
