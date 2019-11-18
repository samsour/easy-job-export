export default {
  namespaced: true,
  state: {
    name: "",
    resId: 0,
  },
  getters: {
    resId: state => state.resId,
    name: state => state.name,
  },
  mutations: {
    SET_USER_NAME(state, name) {
      state.name = name;
    },
    SET_RES_ID(state, id) {
      state.resId = id;
    }
  },
  actions: {
    setName({ commit, state }, name) {
      commit("SET_USER_NAME", name);
    },
    setResId({ commit, state }, id) {
      commit("SET_RES_ID", id);
    },
  }
};
