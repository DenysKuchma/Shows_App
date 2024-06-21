<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" lg="3">
        <v-card class="pa-4 card">
          <v-row class="justify-center">
            <v-col cols="10">
              <ShowFinder v-model="searchText" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="9">
        <v-card class="pa-5 card">
          <h1 class="mb-5">{{ $t("shows") }}</h1>
          <v-row class="shows">
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
            v-if="this.searchText == ''"
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
import { showsAll } from "../../api/getAllShows";
import searchMixin from "../../utils/filtersMixin.js";
import ShowFinder from "../../components/ShowFinder/ShowFinder.vue";
import LoadMoreAtPage from "../../components/LoadMoreAtPage/LoadMoreAtPage.vue";
import loadMixin from "@/utils/loadMixin";

export default {
  name: "MainPage",
  components: {
    ShowItem,
    ShowFinder,
    LoadMoreAtPage,
  },
  mixins: [searchMixin, loadMixin],
  data() {
    return {
      shows: [],
    };
  },
  async created() {
    await this.getAllShows();
    this.updateVisibleItems(this.shows);
  },
  methods: {
    async getAllShows() {
      this.shows = await showsAll.getAllShows();
    },
  },
  computed: {
    itemsToDisplay() {
      return this.searchText !== "" ? this.filteredShows : this.visibleItems;
    },
  },
};
</script>

<style>
.shows {
  gap: 50px;
  justify-content: center;
}
</style>
