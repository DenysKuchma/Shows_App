<template>
  <v-card
    :class="[showClass]"
    class="show-card d-flex flex-column ustify-space-between"
  >
    <v-card-title class="mx-auto">{{ show.name }}</v-card-title>
    <v-img :src="show.image" v-if="show.image" class="show-image" />
    <div v-else>{{ $t("noImage") }}</div>

    <v-card-text class="subtitle">{{ destactArray }}</v-card-text>
    <v-card-text><span v-html="`${truncatedSummary}`"></span></v-card-text>

    <v-card-actions class="flex-column align-start">
      <v-btn
        v-if="
          !isShowWatched(show) &&
          !isShowToWatch(show) &&
          permissions.addToWatchedState
        "
        @click="pinWatched"
        text
        color="primary"
      >
        {{ $t("markWatched") }}
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn
        v-if="
          !isShowWatched(show) &&
          !isShowToWatch(show) &&
          permissions.addToWatchlistState
        "
        @click="pinToWatch"
        text
        color="primary"
      >
        {{ $t("markToWatch") }}
        <v-icon>mdi-star</v-icon>
      </v-btn>
      <v-btn
        v-if="isShowWatched(show)"
        @click="deleteShowWatched(show)"
        text
        color="success"
      >
        {{ $t("markWatchedRemove") }}
        <v-icon>mdi-heart-off</v-icon>
      </v-btn>
      <v-btn
        v-if="isShowToWatch(show)"
        @click="deleteShowToWatch(show)"
        text
        color="warning"
      >
        {{ $t("markToWatchRemove") }}
        <v-icon>mdi-star-off</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import store from "../../store";
import { mapGetters } from "vuex";
export default {
  name: "ShowItem",
  props: {
    show: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["GET_PERMISSION_STATE"]),
    permissions() {
      return this.GET_PERMISSION_STATE;
    },
    destactArray() {
      return this.show.genres.join(", ");
    },
    showClass() {
      if (this.isShowWatched(this.show)) {
        return "show-item-watched";
      } else if (this.isShowToWatch(this.show)) {
        return "show-item-to-watch";
      } else {
        return "";
      }
    },
    truncatedSummary() {
      return this.truncateText(this.show.summary, 25);
    },
  },
  methods: {
    pinWatched() {
      if (!this.isShowWatched(this.show)) {
        store.commit("SET_WATCHED_SHOW", this.show);
      }
    },
    isShowWatched(show) {
      return store.state.watchedShows.watchedShows.some(
        (watchedShow) => watchedShow.id === show.id
      );
    },
    pinToWatch() {
      if (!this.isShowToWatch(this.show)) {
        store.commit("SET_TO_WATCH_SHOW", this.show);
      }
    },
    isShowToWatch(show) {
      return store.state.toWatchShows.toWatchShows.some(
        (toWatchShows) => toWatchShows.id === show.id
      );
    },
    deleteShowWatched(show) {
      store.commit("DELETE_WATCHED_SHOW", show);
    },
    deleteShowToWatch(show) {
      store.commit("DELETE_TO_WATCH_SHOW", show);
    },
    truncateText(text, limit) {
      const words = text.split(" ");
      if (words.length > limit) {
        return words.slice(0, limit).join(" ") + "...";
      } else {
        return text;
      }
    },
  },
};
</script>

<style scoped>
.subtitle {
  font-weight: bold;
}

.show-card {
  border-radius: 10px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  padding: 20px;
}

.show-item-watched {
  border: 2px solid #4caf50 !important;
}

.show-item-to-watch {
  border: 2px solid #ffc107 !important;
}

.v-application--is-ltr .v-card__actions > .v-btn.v-btn + .v-btn {
  margin-left: 0 !important;
}

.v-image {
  height: 400px !important;
  background-position: top !important;
  flex: none !important;
}
.v-card {
  height: 100%;
}
.v-card__actions {
  margin-top: auto;
}
@media (max-width: 420px) {
  .show-card {
    padding: 10px;
  }
}
</style>
<style>
.v-image__image--cover {
  background-size: contain !important;
}
</style>
