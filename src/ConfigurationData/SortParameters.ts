interface SortParameters {
  name: string;
  linkName: string;
}

const sortingParametersMovies: SortParameters[] = [
  {
    name: "Popularity",
    linkName: "popularity.desc",
  },
  {
    name: "Top rated",
    linkName: "vote_average.desc",
  },
  {
    name: "Revenue",
    linkName: "revenue.desc",
  },
];

const sortingParametersTvShows: SortParameters[] = [
  {
    name: "Popularity",
    linkName: "popularity.desc",
  },
  {
    name: "Top rated",
    linkName: "vote_average.desc",
  },
];

export { sortingParametersMovies, sortingParametersTvShows };
