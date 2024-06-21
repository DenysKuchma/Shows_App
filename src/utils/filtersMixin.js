export default {
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
  methods: {
    handleSearch(searchText) {
      this.searchText = searchText;
    },
  },
  computed: {
    filteredShows() {
      return this.shows.filter((show) =>
        show.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
};
