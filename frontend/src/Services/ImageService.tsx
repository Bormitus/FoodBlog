const api = "http://localhost:5022/api/recipeImages/";

export const getImageUrl = (imagePath: string) => {
    return api + `${imagePath}/`;
};
//<img src={getImageUrl(recipe.image)} alt={recipe.name} />
