export const showsByGenres = {
  async getShowsByGenres(genres) {
    try {
      const response = await fetch(
        `https://api.tvmaze.com/shows?genre=${genres}`
      );
      const data = await response.json();
      const filteredShows = data.filter((show) => {
        return show.genres.includes(genres);
      });
      const transformedData = filteredShows.map((item) => ({
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
export const getAllGenres = {
  async getShowsGenres() {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows?page=100`);
      const data = await response.json();

      const genresSet = new Set();
      data.forEach((item) => {
        if (item.genres) {
          item.genres.forEach((genre) => {
            genresSet.add(genre);
          });
        }
      });

      const genres = Array.from(genresSet).map((genre, index) => ({
        id: index,
        name: genre,
      }));

      return genres;
    } catch (error) {
      console.error("Ошибка при загрузке данных", error);
      return [];
    }
  },
};
