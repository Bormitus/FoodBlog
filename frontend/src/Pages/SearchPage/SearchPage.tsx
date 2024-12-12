import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { deleteRecipeAPI, searchRecipes } from "../../Services/RecipeService";
import Search from "../../Components/Search/Search";
import { RecipeSearch } from "../../Models/Recipe";
import { Outlet, useNavigate } from "react-router-dom";
import {
  favoriteAddAPI,
  favoriteDeleteAPI,
  favoriteGetAPI,
} from "../../Services/FavoriteRecipeService";
import { FavoriteGet } from "../../Models/Favorite";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/useAuth";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Spinner from "../../Components/Spinner/Spinner";

const SearchPage = () => {
  let debounceTimer: NodeJS.Timeout;
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<RecipeSearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [favoriteValues, setFavoriteValues] = useState<FavoriteGet[]>([]);
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (window.location.pathname === "/search") {
      navigate("/search/recipes-list");
    }

    fetchRecipes();
    if (isLoggedIn()) getFavorite();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchRecipes();
    }, 500);
  };

  const fetchRecipes = async () => {
    const result = await searchRecipes(search);
    if (typeof result == "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
  };

  const getFavorite = () => {
    favoriteGetAPI()
      .then((res) => {
        if (res?.data) {
          setFavoriteValues(res?.data);
        }
      })
      .catch((e) => {
        toast.warning("Could not get portfolio values!");
      });
  };

  const onToggleFavorite = (id: number, isFavorite: boolean) => {
    if (isFavorite) {
      // Удаление из избранного
      favoriteDeleteAPI(id)
        .then((res) => {
          if (res?.status === 200) {
            toast.success("Рецепт удалён из избранного!");
            getFavorite();
          }
        })
        .catch(() => {
          toast.warning("Не удалось удалить рецепт из избранного!");
        });
    } else {
      // Добавление в избранное
      favoriteAddAPI(id)
        .then((res) => {
          if (res?.status === 204) {
            toast.success("Рецепт добавлен в избранное!");
            getFavorite();
          }
        })
        .catch(() => {
          toast.warning("Не удалось добавить рецепт в избранное!");
        });
    }
  };

  const deleteRecipe = (id: number) => {
    deleteRecipeAPI(id)
      .then((res) => {
        if (res?.status == 204) {
          toast.success("Рецепт удалён!");
          fetchRecipes();
        }
      })
      .catch((e) => {
        toast.warning("Не удалось удалить рецепт!");
      });
  };

  return (
    <>
      {searchResult ? (
        <div className="relative flex justify-center min-h-screen">
          <Sidebar />
          <div className="w-full max-w-screen-xl flex flex-col p-2 space-y-2 bg-gray-100">
            <Search handleSearchChange={handleSearchChange} search={search} />
            <div className="flex-1">
              <Outlet
                context={{
                  searchResult,
                  favoriteValues,
                  onToggleFavorite,
                  deleteRecipe,
                }}
              />
            </div>
          </div>
          {serverError && <div> Unable to connect to API </div>}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SearchPage;
