import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const API_URL: string = `https://api.themoviedb.org/3/`;

export const queryClient = new QueryClient();

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
});

// $api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//   return config;
// });

export default $api;
