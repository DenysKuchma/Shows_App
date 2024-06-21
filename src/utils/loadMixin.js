export default {
  data() {
    return {
      visibleItems: [],
      currentIndex: 0,
    };
  },
  methods: {
    updateVisibleItems(allItems) {
      const endIndex = Math.min(this.currentIndex + 10, allItems.length);
      this.visibleItems = allItems.slice(0, endIndex);
    },
    loadMore(allItems) {
      this.currentIndex += 10;
      this.updateVisibleItems(allItems);
    },
  },
};
