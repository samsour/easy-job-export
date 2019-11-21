import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import UserModule from "./modules/User";
import CustomerModule from "./modules/Customer";
import ProjectModule from "./modules/Project";
import BookingModule from "./modules/Booking";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "easyJobExport",
  storage: localStorage,
  reducer: state => ({
    // only sync following modules
    user: state.user,
    customer: state.customer,
    project: state.project,
    booking: state.booking,
  })
});

export default new Vuex.Store({
  modules: {
    user: UserModule,
    customer: CustomerModule,
    project: ProjectModule,
    booking: BookingModule
  },
  state: {
    menuActive: false,
    activeSearch: null,
    // searchTerm: "",
    // activeItem: null,
    // onlineSync: false,
    // globalAlert: "",
    // scrollPosition: 0
  },
  getters: {
    menuActive: state => state.menuActive,
  },
  mutations: {
    TOGGLE_MENU() {
      this.state.menuActive = !this.state.menuActive;
    },
  },
  actions: {
    initializeStore({ commit }) {
      commit("INITIALIZE_STORE");
    },
    toggleMenu({ commit }) {
      commit("TOGGLE_MENU");
    },
    addGlobalAlert({ commit }, alertMessage) {
      commit("SET_GLOBAL_ALERT", alertMessage);
      if (alertMessage) {
        setTimeout(() => {
          commit("SET_GLOBAL_ALERT", "");
        }, 10000);
      }
    }
  },
  plugins: [vuexPersist.plugin]
});
