<template>
  <v-text-field
    v-model="searchText"
    :label="$t('search')"
    outlined
    dense
    append-icon="mdi-magnify"
  ></v-text-field>
</template>

<script>
export default {
  name: "ShowFinder",
  data() {
    return {
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.$emit("input", this.searchText);
    },
  },
};
</script>
