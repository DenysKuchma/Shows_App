import Vue from "vue";
import Vuex from "vuex";
import watchedShows from "./modules/watchedShows/watchedShows.js";
import toWatchShows from "./modules/toWatchShows/toWatchShows.js";
import permissionState from "./modules/permissionState/permissionState.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    watchedShows,
    toWatchShows,
    permissionState,
  },
});
