<template>
  <div class="d-flex justify-space-around">
    <v-menu v-model="isSidebarOpen">
      <v-list>
        <v-list-item
          v-for="genre in genres"
          :key="genre.id"
          @click="selectGenres(genre.name)"
        >
          <v-list-item-title>{{ genre.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { getAllGenres } from "../../api/getGenres";
import router from "@/router";
export default {
  name: "SideBar",
  data() {
    return {
      genres: [],
      isSidebarOpen: false,
    };
  },
  async created() {
    await this.getAllGenres();
  },
  methods: {
    async getAllGenres() {
      this.genres = await getAllGenres.getShowsGenres();
    },
    async selectGenres(genre) {
      const currentRoute = this.$route;
      const newRoute = { name: "GenresPage", params: { genre } };
      if (
        currentRoute.name !== newRoute.name ||
        currentRoute.params.genre !== genre
      ) {
        router.push(newRoute);
      }
    },
    toggle() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>
<style scoped>
.v-menu__content {
  top: 65px !important;
  left: 0px !important;
}
</style>
