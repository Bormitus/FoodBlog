import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { FavoriteGet, FavoritePost } from "../Models/Favorite";

const api = "http://localhost:5022/api/favorite-recipes/";

export const favoriteAddAPI = async (id: number) => {
  try {
    const data = await axios.post<FavoritePost>(api + `?id=${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const favoriteDeleteAPI = async (id: number) => {
  try {
    const data = await axios.delete<FavoritePost>(api + `?id=${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const favoriteGetAPI = async () => {
    try {
      const data = await axios.get<FavoriteGet[]>(api);
      return data;
    } catch (error) {
      handleError("Ошибка" + error);
    }
  };
  