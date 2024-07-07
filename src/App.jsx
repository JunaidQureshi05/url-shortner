import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout/AppLayout";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";
import Link from "./pages/Link/Link";
import RedirectionLink from "./pages/RedirectionLink/RedirectionLink";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/link/:link",
          element: <Link />,
        },
        {
          path: "/:id",
          element: <RedirectionLink />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
