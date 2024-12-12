import axios from "axios";
import { Search } from "react-router";
import { RecipeGet, RecipePost, RecipeSearch } from "../Models/Recipe";
import { handleError } from "../Helpers/ErrorHandler";
import { RecipeIngredientPost } from "../Models/RecipeIngredient";

const api = "http://localhost:5022/api/ingredient/";

export const postIngredient = async(name: string, quantity: number, unit: string, id: number) => {
    try{
        const data = await axios.post<RecipeIngredientPost>(api + `${id}`, {
            name: name,
            quantity: quantity,
            unit: unit
        })
        return data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

export const updateIngredient = async(name: string, quantity: number, unit: string, id: number) => {
    try{
        const data = await axios.put<RecipeIngredientPost>(api + `${id}`, {
            name: name,
            quantity: quantity,
            unit: unit
        })
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const deleteIngredient = async(id: number) => {
    try {
        const callback = await axios.delete(api + `${id}`);
        return callback;
      } catch (error: any) {
        handleError(error);
      }
}