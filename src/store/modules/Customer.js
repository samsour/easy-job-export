export default {
  namespaced: true,
  state: {
    customers: [
      {
        id: "f0923f0",
        name: "Schwermetallica",
        icon: ""
      },
      {
        id: "d09r3f0",
        name: "Kunde Echt ein Langernameundlangeswort GmbH",
        icon: ""
      },
      {
        id: "xc0223f0",
        name: "ArenaNet",
        icon: ""
      },
      {
        id: "jjwer31r",
        name: "Awesome Cosmetics Ltd",
        icon: ""
      }
    ]
  },
  getters: {
    customers: state => state.customers,
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
  }
};
