export default {
  namespaced: true,
  state: {
    customers: []
  },
  getters: {
    customers: state => state.customers,
    customerById: state => id => state.customers.find(customer => customer.id == id)
  },
  mutations: {
    ADD_CUSTOMER(state, data) {
      state.customers.push(data);
    }
  },
  actions: {
    add({ commit, state }, data) {
      commit("ADD_CUSTOMER", data);
    },
    set({ commit, state }, { id, data }) {
      console.log(state.getters);
    }
  }
};
