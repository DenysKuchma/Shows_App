<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn icon @click="toggleSidebar">
        <v-icon @click="scrollToTop">mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="title">
        <router-link to="/">{{ $t("title") }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <LanguageSelector v-if="permissions.changeLangState" />
      <v-btn icon @click="toggleTheme" v-if="permissions.changeThemeState">
        <v-icon>{{
          isDarkTheme ? "mdi-weather-sunny" : "mdi-weather-night"
        }}</v-icon>
      </v-btn>
      <router-link to="/permission">
        <v-btn icon>
          <v-icon>mdi-account-alert</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/subscribeNews" v-if="permissions.sendFormState">
        <v-btn icon>
          <v-icon>mdi-email</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/toWatch" v-if="permissions.addToWatchlistState">
        <v-btn icon>
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </router-link>
      <router-link to="/watched" v-if="permissions.addToWatchedState">
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>

    <router-view class="mt-16"></router-view>

    <v-footer app color="primary" dark>
      <span>&copy; 2024 {{ $t("coppyrigh") }}</span>
    </v-footer>

    <side-bar ref="sidebar" />
    <BackToTopButton />
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar/SideBar.vue";
import BackToTopButton from "./components/BackToTopButton/BackToTopButton.vue";
import LanguageSelector from "@/components/LanguageSelector/LanguageSelector";
import backendPermissionSimulation from "@/utils/backendPermissionSimulation";
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    SideBar,
    BackToTopButton,
    LanguageSelector,
  },
  data() {
    return {
      isDarkTheme: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.$refs.sidebar.toggle();
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      this.$vuetify.theme.dark = this.isDarkTheme;
    },
  },
  computed: {
    ...mapGetters(["GET_PERMISSION_STATE"]),
    permissions() {
      return this.GET_PERMISSION_STATE || {};
    },
  },
  created() {
    store.commit(
      "SET_TO_PERMISSION_STATE",
      backendPermissionSimulation.permission
    );
  },
  watch: {
    permissions: {
      handler(newPermissions) {
        if (!newPermissions.addToWatchedState) {
          store.commit("CLEAR_WATCHED_SHOWS");
        }
        if (!newPermissions.addToWatchlistState) {
          store.commit("CLEAR_TO_WATCH_SHOWS");
        }
      },
      deep: true,
    },
  },
};
</script>

<style>
.v-footer,
.v-app-bar {
  z-index: 999 !important;
}
.title a {
  color: #fff !important;
  text-decoration: none !important;
}
@media (max-width: 420px) {
  .v-toolbar__content {
    flex-wrap: wrap !important;
  }
  .v-sheet.theme--dark.v-toolbar.v-app-bar.v-app-bar--fixed.primary {
    height: 110px !important;
  }
}
</style>
