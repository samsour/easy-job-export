export default {
  namespaced: true,
  state: {
    currentBooking: [],
    bookings: [],
  },
  getters: {
    bookings: state => state.bookings,
    bookingById: state => id => state.bookings.find(booking => booking.id == id),
    current: state => state.currentBooking
  },
  mutations: {
    ADD_ENTRY_TO_CURRENT_BOOKING(state, entry) {
      state.currentBooking.push(entry);
    },
    REMOVE_ENTRY(state, id) {
      state.currentBooking = state.currentBooking.filter(entry => entry.id !== id);
    }
  },
  actions: {
    addEntry({ commit }, entry) {
      commit("ADD_ENTRY_TO_CURRENT_BOOKING", entry);
    },
    removeEntry({ commit }, id) {
      commit("REMOVE_ENTRY", id);
    }
  }
};
