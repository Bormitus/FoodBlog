import React from "react";
import { RecipeSearch } from "../../Models/Recipe";
import { Link } from "react-router-dom";
import FavoriteRecipeCheckbox from "../FavoriteRecipes/FavoriteRecipeCheckbox/FavoriteRecipeCheckbox";
import { getImageUrl } from "../../Services/ImageService";
import DeleteRecipeButton from "../Recipe/DeleteRecipeButton/DeleteRecipeButton";
import EditRecipeButton from "../Recipe/EditRecipeButton/EditRecipeButton";
import { useAuth } from "../../Context/useAuth";

interface Props {
  searchResult: RecipeSearch;
  isFavorite: boolean;
  onToggleFavorite: (id: number, isFavorite: boolean) => void;
  deleteRecipe: (id: number) => void;
}

const Card: React.FC<Props> = (props: Props): JSX.Element => {
  const id = props.searchResult.id;
  const { isLoggedIn, isAdmin } = useAuth();
  return (
    <div className="card-container relative flex flex-col items-center w-72 p-6 rounded-lg shadow-lg bg-white">
      <div className="flex absolute top-3 right-6 space-x-2">
        {isAdmin() && (
          <>
            <DeleteRecipeButton id={id} deleteRecipe={props.deleteRecipe} />
            <EditRecipeButton id={id} />
          </>
        )}

        {isLoggedIn() && (
          <FavoriteRecipeCheckbox
            id={props.searchResult.id}
            isFavorite={props.isFavorite}
            onToggleFavorite={props.onToggleFavorite}
          />
        )}
      </div>
      <Link to={`/recipe/${id}/`} className="card-title text-xl font-bold mb-2">
      <div className="checkbox-image-container w-full mt-6">
        <img
          src={getImageUrl(props.searchResult.image)}
          alt={props.searchResult.name}
          className="card-image w-full h-40 object-cover rounded-md mb-4"
        />
      </div>

        {props.searchResult.name}
      <p className="card-time text-gray-500 text-sm">
        {props.searchResult.cookingTime} мин.
      </p>
      </Link>

    </div>
  );
};

export default Card;
