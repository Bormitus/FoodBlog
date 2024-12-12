export type RecipeIngredientGet = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
};

export type RecipeIngredientPost = {
    name: string;
    quantity: number;
    unit: string;
}