export const showsAll = {
  async getAllShows() {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows`);
      const data = await response.json();

      const transformedData = data.map((item) => ({
        id: item.id,
        name: item.name,
        summary: item.summary,
        image: item.image ? item.image.medium : null,
        genres: item.genres,
      }));

      return transformedData;
    } catch (error) {
      console.error("Ошибка при загрузке данных", error);
      return [];
    }
  },
};
