export default {
  namespaced: true,
  state: {
    name: "",
    id: "92r30fnu70",
    exportValue: 0,
  },
  getters: {
    id: state => state.resId,
    exportValue: state => state.exportValue,
    name: state => state.name,
  },
  mutations: {
    SET_USER_NAME(state, name) {
      state.name = name;
    },
    SET_EXPORT_VALUE(state, val) {
      state.exportValue = val;
    }
  },
  actions: {
    setName({ commit, state }, name) {
      commit("SET_USER_NAME", name);
    },
    setExportValue({ commit, state }, val) {
      commit("SET_EXPORT_VALUE", val);
    },
  }
};
