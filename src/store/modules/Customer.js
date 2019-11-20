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
    },
    SET_CUSTOMER(state, { id, customerData }) {
      const indexToChange = state.customers.findIndex(customer => customer.id == id);
      Object.assign(state.customers[indexToChange], customerData);
    }
  },
  actions: {
    add({ commit }, data) {
      commit("ADD_CUSTOMER", data);
    },
    set({ commit }, { id, data }) {
      commit("SET_CUSTOMER", { id, data })
    },
    setImage({ commit, state, getters }, { id, imageUrl }) {
      const customer = getters.customerById(id);
      customer.image = imageUrl;
      commit("SET_CUSTOMER", { id, customer });
    }
  }
};
