<template>
  <v-select
    v-model="selectedLanguage"
    :items="languages"
    @change="changeLanguage"
    label="Language"
    variant="outlined"
    dense
    hide-details
  ></v-select>
</template>

<script>
export default {
  data() {
    return {
      selectedLanguage: this.$i18n.locale,
      languages: [
        { text: "English", value: "en" },
        { text: "Українська", value: "uk" },
      ],
    };
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage;
    },
  },
};
</script>
<style scoped>
.v-input {
  width: 150px !important;
  flex: none;
}
.v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active {
  top: 53px !important;
}
</style>
