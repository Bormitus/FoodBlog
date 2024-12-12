import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import RecipePage from "../Pages/RecipePage/RecipePage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import CardList from "../Components/CardList/CardList";
import FavoriteList from "../Components/FavoriteRecipes/FavoriteList/FavoriteList";
import CreatePage from "../Pages/CreatePage/CreatePage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import EditPage from "../Pages/EditPage/EditPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "search",
        element: <SearchPage />,
        children: [
          { path: "recipes-list", element: <CardList /> },
          {
            path: "favorite-recipes",
            element: (
              <ProtectedRoute>
                <FavoriteList />
              </ProtectedRoute>
            ),
          },
        ],
      },
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "recipe/:recipeId",
        element: (
            <RecipePage />
        ),
      },
      {
        path: "recipe/:recipeId/edit",
        element: (
          <ProtectedRoute>
            <EditPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "create",
        element: (
          <AdminRoute>
            <CreatePage />
          </AdminRoute>
        ),
      },
    ],
  },
]);
