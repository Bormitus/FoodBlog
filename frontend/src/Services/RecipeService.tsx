import axios from "axios";
import { RecipeGet, RecipePost, RecipeSearch } from "../Models/Recipe";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5022/api/recipe/";

export const searchRecipes = async (query: string) => {
  try {
    const data = await axios.get<RecipeSearch[]>(api + `?Name=${query}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error has occured";
    }
  }
};

export const getRecipeAPI = async (id: number) => {
  try {
    const data = await axios.get<RecipeGet>(api + `${id}`);
    console.log(data);
    return data;
  } catch (error: any) {
    console.log("error message from API", error.message);
  }
};

export const deleteRecipeAPI = async (id: number) => {
  try {
    const callback = await axios.delete(api + `${id}`);
    console.log(callback);
    return callback;
  } catch (error: any) {
    console.log("error message from API", error.message);
  }
};

export const updateRecipeAPI = async (id: number, image: File | null, name: string, cookingTime: number, text: string) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("text", text);
  formData.append("cookingTime", cookingTime.toString()); // Преобразуем число в строку

  if (image) {
    formData.append("image", image);
  }
  
  console.log(image);
  try {
    const data = await axios.put(api + `${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const postRecipeAPI = async (image: File, name: string, cookingTime: number, text: string) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("text", text);
  formData.append("cookingTime", cookingTime.toString()); // Преобразуем число в строку
  console.log(image);
  try {
    const data = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

