export default {
  namespaced: true,
  state: {
    name: "",
    userId: 0,
  },
  getters: {
    userId: state => state.userId,
    name: state => state.name,
  },
  mutations: {
    SET_USER_NAME(state, name) {
      state.name = name;
    },
    SET_USER_ID(state, id) {
      state.resId = id;
    }
  },
  actions: {
    setName({ commit, state }, name) {
      commit("SET_USER_NAME", name);
    },
    SET_USER_ID({ commit, state }, id) {
      commit("SET_RES_ID", id);
    },
  }
};
