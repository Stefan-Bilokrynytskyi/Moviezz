interface SortParameters {
  name: string;
  linkName: string;
}

const sortingParameters: SortParameters[] = [
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

export { sortingParameters };
