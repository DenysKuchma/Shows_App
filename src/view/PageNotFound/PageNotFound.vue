<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <div class="text-center">
          <img src="@/assets/404.avif" alt="404 Image" />
          <h1 class="headline font-weight-bold">{{ $t("pageNotFound") }}</h1>
          <p class="subtitle-1">{{ $t("pageNotFoundDesc") }}</p>
          <v-btn color="primary" to="/">{{ $t("home") }}</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style>
.headline {
  font-size: 36px;
  margin-top: 20px;
}

.subtitle-1 {
  margin-top: 10px;
}

img {
  max-width: 100%;
}
</style>
