import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
const app = createApp(App);


const apiUrl = process.env.VUE_APP_API_BASE_URL;

app.config.globalProperties.$axios = axios.create({
  baseURL: apiUrl // Replace with your API base URL
});


// app.use(store).mount('#app');
app.use(router)
app.mount('#app');

