import React, { SyntheticEvent } from "react";
import { FavoriteGet } from "../../../Models/Favorite";
import { Link } from "react-router-dom";
import DeleteFavorite from "../DeleteFavorite/DeleteFavorite";
import FavoriteRecipeCheckbox from "../FavoriteRecipeCheckbox/FavoriteRecipeCheckbox";
import { getImageUrl } from "../../../Services/ImageService";
import { useAuth } from "../../../Context/useAuth";

interface Props {
  favoriteValue: FavoriteGet;
  onToggleFavorite: (id: number, isFavorite: boolean) => void;
}
const CardFavorite: React.FC<Props> = (props: Props): JSX.Element => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="card-container relative flex flex-col items-center w-72 p-6 rounded-lg shadow-lg bg-white">
      <div className="absolute top-2 right-5">
        {isLoggedIn() && (
          <FavoriteRecipeCheckbox
            id={props.favoriteValue.id}
            isFavorite={true}
            onToggleFavorite={props.onToggleFavorite}
          />
        )}
      </div>

      <div className="checkbox-image-container w-full mt-6">
        <img
          src={getImageUrl(props.favoriteValue.image)}
          alt={props.favoriteValue.name}
          className="card-image w-full h-40 object-cover rounded-md mb-4"
        />
      </div>

      <Link
        to={`/recipe/${props.favoriteValue}/`}
        className="card-title text-xl font-bold mb-2"
      >
        {props.favoriteValue.name}
      </Link>
      <p className="card-time text-gray-500 text-sm">
        {props.favoriteValue.cookingTime} мин.
      </p>
    </div>
  );
};

export default CardFavorite;
