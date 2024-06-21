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
          <v-row class="justify-center">
            <v-col cols="10">
              <HomeBtn />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="9">
        <v-card class="pa-5 card">
          <h1 class="mb-5">{{ $t("watchedTitle") }}</h1>
          <div class="items">
            <v-row v-if="filteredShows.length === 0" class="no-shows">
              <v-col>
                <p class="font-weight-regular">{{ $t("notFind") }}</p>
                <v-col cols="15">
                  <HomeBtn />
                </v-col>
              </v-col>
            </v-row>
            <v-row class="shows" v-else>
              <v-col
                cols="12"
                sm="6"
                md="6"
                lg="5"
                v-for="show in filteredShows"
                :key="show.id"
              >
                <ShowItem :show="show" class="items" />
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HomeBtn from "@/components/HomeBtn/HomeBtn.vue";
import ShowFinder from "../../components/ShowFinder/ShowFinder.vue";
import { mapGetters } from "vuex";
import ShowItem from "../../components/ShowItem/ShowItem.vue";

export default {
  name: "WatchedPage",
  components: {
    HomeBtn,
    ShowFinder,
    ShowItem,
  },
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    ...mapGetters(["GET_WATCHED_SHOW"]),
    filteredShows() {
      return this.GET_WATCHED_SHOW.filter((show) =>
        show.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    handleSearch(searchText) {
      this.searchText = searchText;
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
