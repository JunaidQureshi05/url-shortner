import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout/AppLayout";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth/Auth";
import Link from "./pages/Link/Link";
import RedirectionLink from "./pages/RedirectionLink/RedirectionLink";
import UrlProvider from "./context";
import RequireAuth from "./components/RequireAuth/RequireAuth";

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
          element: (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          ),
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/link/:link",
          element: (
            <RequireAuth>
              <Link />
            </RequireAuth>
          ),
        },
        {
          path: "/:id",
          element: (
            <RequireAuth>
              <RedirectionLink />
            </RequireAuth>
          ),
        },
      ],
    },
  ]);
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
