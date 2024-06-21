import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify.js";
import i18n from "./plugins/i18n.js";
import veeValidate from "./plugins/veeValidate.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/style.css";

new Vue({
  store,
  router,
  vuetify,
  i18n,
  veeValidate,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(Toast);
