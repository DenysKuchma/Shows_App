export default {
  state: {
    toWatchShows: [],
  },
  mutations: {
    SET_TO_WATCH_SHOW(state, show) {
      state.toWatchShows.push(show);
    },
    DELETE_TO_WATCH_SHOW(state, show) {
      state.toWatchShows = state.toWatchShows.filter(
        (item) => item.id !== show.id
      );
    },
    CLEAR_TO_WATCH_SHOWS(state) {
      state.toWatchShows = [];
    },
  },
  getters: {
    GET_TO_WATCH_SHOW: (state) => {
      return state.toWatchShows;
    },
  },
};
