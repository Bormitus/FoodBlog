import React, { SyntheticEvent } from "react";
import { FavoriteGet } from "../../../Models/Favorite";
import CardFavorite from "../CardFavorite/CardFavorite";
import { useOutletContext } from "react-router";
import { RecipeSearch } from "../../../Models/Recipe";

const FavoriteList = () => {
  const { searchResult } = useOutletContext<{ searchResult: RecipeSearch[] }>();
  const { favoriteValues } = useOutletContext<{
    favoriteValues: FavoriteGet[];
  }>();
  const { onToggleFavorite } = useOutletContext<{
    onToggleFavorite: (id: number, isFavorite: boolean) => void;
  }>();

  return (
    <section id="favorite">
      {favoriteValues.length > 0 ? (
        <div className="card-list-container grid gap-6">
          {favoriteValues.map((value) => {
            const isFavorite = searchResult.some(
              (search) => search.id === value.id
            );
            if (isFavorite) {
              return (
                <CardFavorite
                  favoriteValue={value}
                  onToggleFavorite={onToggleFavorite}
                />
              );
            }
          })}
        </div>
      ) : (
        <p className="not-found-message">В избранном ничего нет</p>
      )}
    </section>
  );
};
export default FavoriteList;
