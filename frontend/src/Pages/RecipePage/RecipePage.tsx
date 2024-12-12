import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RecipeGet } from "../../Models/Recipe";
import { getRecipeAPI } from "../../Services/RecipeService";
import RecipeDashboard from "../../Components/Recipe/RecipeDashboard/RecipeDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";
import { getImageUrl } from "../../Services/ImageService";
import RecipeComment from "../../Components/RecipeComment/RecipeComment";

const RecipePage = () => {
  let { recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeGet>();
  
  useEffect(() => {
    const getRecipeInit = async () => {
      const result = await getRecipeAPI(Number(recipeId!));
      setRecipe(result?.data);
    };
    getRecipeInit();
  }, []);

  return (
    <>
      {recipe ? (
        <div className="flex flex-col items-center justify-center">
          <RecipeDashboard>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4">
                <div className="flex">
                  <Tile title="Название" subTitle={recipe?.name} />
                  <Tile title="Время готовки" subTitle={`${recipe?.cookingTime} минут`} />
                </div>

                <Tile title="Описание" subTitle={recipe?.text}  />

                <Tile title="" subTitle={""}>
                  <img src={getImageUrl(recipe?.image)} alt={recipe?.name} className="w-full h-auto rounded-lg" />
                </Tile>

                <div className="w-full lg:w-8/12 px-4">
                <RecipeComment name={recipe?.name} id={recipe?.id} />
                </div>

              </div>

              <div className="w-full lg:w-4/12 px-4">
                <Tile title="Ингредиенты" subTitle={""}>
                  <ul>
                    {recipe?.recipeIngredients.map((ingredient) => (
                      <li key={ingredient.id} className="mb-2">
                        {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                      </li>
                    ))}
                  </ul>
                </Tile>
              </div>
            </div>
          </RecipeDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default RecipePage;
