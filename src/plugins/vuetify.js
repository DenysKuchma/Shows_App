import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#546e7a",
        secondary: "#b0bec5",
        card: "#1f2020",
        accent: "#ff9800",
        error: "#f44336",
        info: "#2196f3",
        success: "#4caf50",
        warning: "#ffc107",
      },
      light: {
        primary: "#1976D2",
        secondary: "#424242",
        card: "#f9ffff",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});
