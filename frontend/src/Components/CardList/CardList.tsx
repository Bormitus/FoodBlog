import React from "react";
import { RecipeSearch } from "../../Models/Recipe";
import Card from "../Card/Card";
import { v4 as uuidv4 } from "uuid";
import { useOutletContext } from "react-router";
import { FavoriteGet } from "../../Models/Favorite";

const CardList = (): JSX.Element => {
  const { searchResult } = useOutletContext<{ searchResult: RecipeSearch[] }>();
  const { favoriteValues } = useOutletContext<{
    favoriteValues: FavoriteGet[];
  }>();
  const { onToggleFavorite } = useOutletContext<{
    onToggleFavorite: (id: number, isFavorite: boolean) => void;
  }>();
  const { deleteRecipe } = useOutletContext<{
    deleteRecipe: (id: number) => void;
  }>();

  return (
    <section id="search">
      {searchResult.length > 0 ? (
        <div className="card-list-container grid gap-6">
          {searchResult.map((result) => {
            const isFavorite = favoriteValues.some(
              (fav) => fav.id === result.id
            );
            return (
              <Card
                key={uuidv4()}
                searchResult={result}
                isFavorite={isFavorite}
                onToggleFavorite={onToggleFavorite}
                deleteRecipe={deleteRecipe}
              />
            );
          })}
        </div>
      ) : (
        <p className="not-found-message">Рецепты по запросу не найдены</p>
      )}
    </section>
  );
};

export default CardList;
