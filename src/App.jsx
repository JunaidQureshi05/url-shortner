import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth/Auth";
import Link from "./pages/Link/Link";
import RedirectionLink from "./pages/RedirectionLink/RedirectionLink";
import UrlProvider from "./context";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { Toaster } from "react-hot-toast";

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
          path: "/link/:id",
          element: (
            <RequireAuth>
              <Link />
            </RequireAuth>
          ),
        },
        {
          path: "/:id",
          element: <RedirectionLink />,
        },
      ],
    },
  ]);
  return (
    <UrlProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
