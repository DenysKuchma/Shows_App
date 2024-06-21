import Vue from "vue";
import Router from "vue-router";
import MainPage from "../view/MainPage/MainPage.vue";
import GenresPage from "../view/GenresPage/GenresPage.vue";
import WatchedPage from "../view/WatchedPage/WatchedPage.vue";
import ToWatchPage from "../view/ToWatchPage/ToWatchPage.vue";
import SubscribeNewsPage from "../view/SubscribeNewsPage/SubscribeNewsPage.vue";
import PermissionPage from "../view/PermissionPage/PermissionPage.vue";
import PageNotFound from "@/view/PageNotFound/PageNotFound.vue";
import store from "@/store";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage,
    },

    {
      path: "/genres/:genre",
      name: "GenresPage",
      component: GenresPage,
    },
    {
      path: "/watched",
      name: "WatchedPage",
      component: WatchedPage,
      beforeEnter: (to, from, next) => {
        if (store.getters.GET_PERMISSION_STATE.addToWatchedState) {
          next();
        } else {
          next("*");
        }
      },
    },
    {
      path: "/toWatch",
      name: "ToWatchPage",
      component: ToWatchPage,
      beforeEnter: (to, from, next) => {
        if (store.getters.GET_PERMISSION_STATE.addToWatchlistState) {
          next();
        } else {
          next("*");
        }
      },
    },
    {
      path: "/subscribeNews",
      name: "SubscribeNewsPage",
      component: SubscribeNewsPage,
      beforeEnter: (to, from, next) => {
        if (store.getters.GET_PERMISSION_STATE.sendFormState) {
          next();
        } else {
          next("*");
        }
      },
    },
    {
      path: "/permission",
      name: "PermissionPage",
      component: PermissionPage,
    },
    { path: "*", component: PageNotFound },
  ],
});
