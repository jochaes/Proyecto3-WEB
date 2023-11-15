// router.js
import { createRouter, createWebHashHistory } from 'vue-router';

import FormsList from './components/FormList/FormsList.vue';
import CrearFormulario from './components/Formulario/CrearFormulario.vue';
import FormularioRespuesta from "./components/FormularioRespuesta/FormularioRespuesta.vue";

const routes = [
  { path: '/', redirect: '/forms-list' },
  { path: '/forms-list', component: FormsList },
  { path: '/crear-formulario', component: CrearFormulario },
  { path: '/formulario-respuesta', component: FormularioRespuesta },
];

const router = createRouter({
  history: createWebHashHistory(process.env.VUE_BASE_URL),
  routes,
});

export default router;
