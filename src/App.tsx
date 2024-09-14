import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import RootLayout from "./Pages/Root";
import SearchFilmsPage from "./Pages/SearchFilmsPage";
import FilmPage from "./Pages/FilmPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <MainPage /> },
      {
        path: "movies",
        element: <SearchFilmsPage />,
        children: [],
      },
      { path: "movies/:id", element: <FilmPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
