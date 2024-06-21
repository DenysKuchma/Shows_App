export const showsByWord = {
  async getShowsByWord(query) {
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      const data = await response.json();

      const transformedData = data.map((item) => ({
        id: item.show.id,
        name: item.show.name,
        summary: item.show.summary,
        image: item.show.image ? item.show.image.medium : null,
      }));

      return transformedData;
    } catch (error) {
      console.error("Ошибка при загрузке данных", error);
      return [];
    }
  },
};
