<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" lg="3">
        <v-card class="pa-4">
          <v-row class="justify-center">
            <v-col cols="10">
              <ShowFinder v-model="searchText" />
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="10">
              <HomeBtn />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="9">
        <v-card class="pa-5 card">
          <h1 class="mb-5">{{ genre }}</h1>
          <v-row v-if="filteredShows.length === 0" class="no-shows">
            <v-col>
              <p class="font-weight-regular">{{ $t("notFind") }}</p>
              <v-col cols="15">
                <HomeBtn />
              </v-col> </v-col
          ></v-row>
          <v-row class="shows" v-else>
            <v-col
              cols="12"
              sm="6"
              md="6"
              lg="5"
              v-for="show in itemsToDisplay"
              :key="show.id"
            >
              <ShowItem :show="show" class="items" />
            </v-col>
          </v-row>
          <LoadMoreAtPage
            v-if="filteredShows.length !== 0 && this.searchText == ''"
            :allItems="shows"
            @loadMore="loadMore"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ShowItem from "../../components/ShowItem/ShowItem.vue";
import HomeBtn from "../../components/HomeBtn/HomeBtn.vue";
import { showsByGenres } from "../../api/getGenres";
import searchMixin from "../../utils/filtersMixin.js";
import ShowFinder from "../../components/ShowFinder/ShowFinder.vue";
import LoadMoreAtPage from "../../components/LoadMoreAtPage/LoadMoreAtPage.vue";
import loadMixin from "@/utils/loadMixin";

export default {
  name: "GenresPage",
  components: {
    ShowItem,
    ShowFinder,
    HomeBtn,
    LoadMoreAtPage,
  },
  mixins: [searchMixin, loadMixin],
  data() {
    return {
      genre: null,
      shows: [],
    };
  },
  async created() {
    await this.loadShows();
    this.updateVisibleItems(this.shows);
  },
  watch: {
    $route(to, from) {
      if (to.fullPath !== from.fullPath) {
        this.genre = to.params.genre;
        this.loadShows();
      }
    },
  },
  methods: {
    async loadShows() {
      this.genre = this.$route.params.genre;
      this.shows = await showsByGenres.getShowsByGenres(this.genre);
      this.updateVisibleItems(this.shows);
    },
  },
  computed: {
    itemsToDisplay() {
      return this.searchText !== "" ? this.filteredShows : this.visibleItems;
    },
  },
};
</script>

<style scoped>
.shows {
  gap: 30px;
  justify-content: center;
}
.no-shows {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
</style>
