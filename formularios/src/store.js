// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    currentPage: 'CrearFormulario', // Default page
  },
  mutations: {
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
  }
  // },
  // actions: {
  //   // You can add actions if needed
  // },
  // getters: {
  //   // You can add getters if needed
  // },
});
