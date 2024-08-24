import $api from "./http";

export const fetchMovies = async (url: string) => {
  try {
    console.log("url = " + url);
    const res = await $api.get(url);
    console.log(res.data);
    return { movies: res.data.results, totalPages: res.data.total_pages };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};
