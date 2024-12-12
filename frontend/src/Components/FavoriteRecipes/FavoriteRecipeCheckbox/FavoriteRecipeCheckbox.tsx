import React, { SyntheticEvent } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface Props {
  id: number;
  isFavorite: boolean;
  onToggleFavorite: (id: number, isFavorite: boolean) => void;
}

const FavoriteRecipeCheckbox: React.FC<Props> = (props: Props) => {
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    props.onToggleFavorite(props.id, props.isFavorite);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input readOnly={true} hidden={true} />
      <button
        type="submit"
        className="text-2xl text-yellow-400"
        aria-label="Добавить в избранное"
      >
        {props.isFavorite ? <MdFavorite/> : <MdFavoriteBorder />}
      </button>
    </form>
  );
};

export default FavoriteRecipeCheckbox;
