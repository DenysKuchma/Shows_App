<template>
  <div class="load-more mt-11 mb-3">
    <v-btn @click="$emit('loadMore', allItems)" color="primary" dark>
      <v-icon left>mdi-arrow-down</v-icon>
      {{ $t("loadMore") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    allItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.load-more {
  text-align: center;
  margin-top: 20px;
}
</style>
