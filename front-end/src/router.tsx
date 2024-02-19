import App from './App';
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from './error';
import { AddPermissionPage, PermissionPage, UpdatePermissionPage } from './pages/permission';
import { LoginPage } from './pages/login';
import { ListPermissionPage } from './pages/permission/listPermission/ListPermissionPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LoginPage />
      },
      {
        path: "permissions",
        element: <PermissionPage />,
        children: [
          {
            path: "",
            element: <ListPermissionPage />
          },
          {
            path: "add",
            element: <AddPermissionPage />
          },
          {
            path: "modify/:id",
            element: <UpdatePermissionPage />
          }
        ]
      }
    ]
  }
]);

export default router;
