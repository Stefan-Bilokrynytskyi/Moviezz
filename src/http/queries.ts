import $api from "./http";

export const fetchMovies = async (url: string) => {
  try {
    console.log("url = " + url);
    const res = await $api.get(url);
    console.log(res.data.results);
    return res.data.results;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};
