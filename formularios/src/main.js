import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

//app.config.productionTip = false;

app.config.globalProperties.$axios = axios.create({
  baseURL: 'http://localhost:3000' // Replace with your API base URL
});

app.mount('#app');