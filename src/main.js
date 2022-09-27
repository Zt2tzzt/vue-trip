import { createApp } from 'vue'
import pinia from "./stores";
import router from './router'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.css'
import { Toast } from 'vant';
import 'vant/es/toast/style';

const app = createApp(App)
app.use(Toast)
app.use(pinia)
app.use(router)
app.mount('#app')
