import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import RootLayout from "./Pages/Root";
import SearchFilmsPage from "./Pages/SearchFilmsPage";
import FilmPage from "./Pages/FilmPage";
import SearchTvShowsPage from "./Pages/SearchTvShowsPage";
import TvShowPage from "./Pages/TvShowPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <MainPage /> },
      {
        path: "movies",
        element: <SearchFilmsPage />,
      },
      {
        path: "tv-shows",
        element: <SearchTvShowsPage />,
      },
      { path: "movies/:id", element: <FilmPage /> },
      {
        path: "tv-shows/:id",
        element: <TvShowPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
