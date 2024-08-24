import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import RootLayout from "./Pages/Root";
import FilmsPage from "./Pages/FilmsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <MainPage /> },
      {
        path: "movies",
        element: <FilmsPage />,
        children: [{ path: ":category", element: <FilmsPage /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
