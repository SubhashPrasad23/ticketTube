import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Watch from "./pages/Watch.jsx";
import Home from "./pages/Home.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import PaymentPage from "./components/PaymentPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "movie/MovieDetails/:id", element: <MovieDetails /> },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/watch",
        element: <Watch />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router}></RouterProvider>

  // </StrictMode>,
);
