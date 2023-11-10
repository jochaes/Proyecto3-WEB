import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

//app.config.productionTip = false;

app.config.globalProperties.$axios = axios.create({
  baseURL: 'https://formulario-dw.onrender.com' // Replace with your API base URL
});

app.mount('#app');