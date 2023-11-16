<!-- NavBar.vue -->
<template>
  <!-- <div class="nav-bar">
    <button @click="changePage('CrearFormulario')">Crear Formulario</button>
    <button @click="changePage('FormsList')">Forms List</button>
  </div> -->

  <div class="nav-bar">
    <router-link to="/forms-list">Ver Formularios</router-link>
    <router-link to="/crear-formulario">Crear Formulario</router-link>
    
    <!-- <router-link to="/formulario-respuesta">Formulario Respuesta</router-link> -->
    <!-- <router-link to="/respuestas">Formulario Respuesta</router-link> -->

  </div>

</template>

<script>


export default {
  name: 'NavBar',
  methods: {
    changePage(page) {
      this.$store.commit('setCurrentPage', page);
    },
  },
};
</script>

<style scoped>

.nav-bar {
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.1);
  box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.1);  
  border-radius: 5px;
  padding: 5px;
}


.nav-bar a {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  text-decoration: none;
}



/* Add your styles for the navigation bar */
</style>
