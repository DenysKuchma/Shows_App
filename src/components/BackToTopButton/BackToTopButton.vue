<template>
  <v-btn v-show="isButtonVisible" color="accent" dark fab @click="scrollToTop">
    <v-icon>mdi-arrow-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      isButtonVisible: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.pageYOffset > 300) {
        this.isButtonVisible = true;
      } else {
        this.isButtonVisible = false;
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.v-btn {
  position: fixed;
  bottom: 60px;
  right: 10px;
  z-index: 9999999999999999999;
}
</style>
