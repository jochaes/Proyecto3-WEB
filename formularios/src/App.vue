

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <NavBar />
  <router-view></router-view>
  
</template>


<script>

import NavBar from './components/NavBar/NavBar.vue';


export default {
  name: 'App',
  components: {
    NavBar
}
}
</script>


<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: none;
}

</style>
