export default {
  state: {
    watchedShows: [],
  },
  mutations: {
    SET_WATCHED_SHOW(state, show) {
      state.watchedShows.push(show);
    },
    DELETE_WATCHED_SHOW(state, show) {
      state.watchedShows = state.watchedShows.filter(
        (item) => item.id !== show.id
      );
    },
    CLEAR_WATCHED_SHOWS(state) {
      state.watchedShows = [];
    },
  },
  getters: {
    GET_WATCHED_SHOW: (state) => {
      return state.watchedShows;
    },
  },
};
