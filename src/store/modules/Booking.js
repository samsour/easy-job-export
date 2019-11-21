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
    }
  },
  actions: {
    addEntry({ commit }, entry) {
      commit("ADD_ENTRY_TO_CURRENT_BOOKING", entry);
    },
  }
};
