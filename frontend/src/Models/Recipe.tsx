import { CommentGet } from "./Comment";
import { RecipeIngredientGet } from "./RecipeIngredient";

export type RecipeSearch = {
    id: number;
    name: string;
    image: string;
    cookingTime: number;
};
export type RecipeGet = {
    id: number;
    name: string;
    image: string;
    text: string
    cookingTime: number;
    recipeIngredients: RecipeIngredientGet[];
};

export type RecipePost = {
    id: number;
    name: string;
    image: string;
    cookingTime: number;
    text: string;
};
