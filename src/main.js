import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPersistedState)
app.use(pinia);
app.use(router);
app.mount('#app');
