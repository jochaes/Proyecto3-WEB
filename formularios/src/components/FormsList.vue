<!-- src/components/FormsList.vue -->

<template>
  <div>
    <h2>Forms List</h2>
    <ul>
      <li v-for="form in forms" :key="form.id">{{ form.nombre_formulario }} - {{ form.fecha_creacion }} - {{form.campos_formulario}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forms: []
    };
  },
  mounted() {
    // Make an HTTP request to fetch forms from the API
    this.fetchForms();
  },
  methods: {
    async fetchForms() {
      try {
        const response = await this.$axios.get('/getForms'); // Replace with your API endpoint
        this.forms = response.data;
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
