// router.js
import { createRouter, createWebHashHistory } from 'vue-router';

import FormsList from './components/FormList/FormsList.vue';
import CrearFormulario from './components/Formulario/CrearFormulario.vue';


const routes = [
  { path: '/', redirect: '/forms-list' },
  { path: '/forms-list', component: FormsList },
  { path: '/crear-formulario', component: CrearFormulario },
];

const router = createRouter({
  history: createWebHashHistory(process.env.VUE_BASE_URL),
  routes,
});

export default router;
