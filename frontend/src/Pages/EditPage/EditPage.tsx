import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import {
  getRecipeAPI,
  postRecipeAPI,
  updateRecipeAPI,
} from "../../Services/RecipeService";
import { toast } from "react-toastify";
import {
  deleteIngredient,
  postIngredient,
  updateIngredient,
} from "../../Services/IngredientService";
import { RecipeIngredientPost } from "../../Models/RecipeIngredient";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { RecipeGet } from "../../Models/Recipe";
import { getImageUrl } from "../../Services/ImageService";

type RecipeFormInputs = {
  image: FileList | null;
  name: string;
  cookingTime: number;
  text: string;
  ingredients: RecipeIngredientPost[];
};

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RecipeFormInputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  let { recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeGet>();

  useEffect(() => {
    const getRecipeInit = async () => {
      const result = await getRecipeAPI(Number(recipeId!));
      if (result?.data) {
        const loadedRecipe = result.data;
        setRecipe(loadedRecipe);

        // Заполнение полей формы загруженными данными
        reset({
          name: loadedRecipe.name,
          cookingTime: loadedRecipe.cookingTime,
          text: loadedRecipe.text,
          ingredients: loadedRecipe.recipeIngredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          })),
        });
      }
    };
    getRecipeInit();
  }, [recipeId, reset, append]);

  const handleUpldate = async (e: RecipeFormInputs) => {
    const imageFile = e.image?.[0] || null; 
    updateRecipeAPI(Number(recipeId), imageFile, e.name, e.cookingTime, e.text)
      .then(async (res) => {
        if (res?.status === 200) {
          toast.success("Рецепт был обновлён");
          const recipeId = res.data.id;
          for (const ingredient of e.ingredients) {
            await updateIngredient(
              ingredient.name,
              ingredient.quantity,
              ingredient.unit,
              recipeId
            )
              .then((res) => {
                if (res?.status === 200) {
                  toast.success("Ингредиент обновлён");
                }
              })
          }
        }
      })
      .catch((e) => {
        toast.warning(e.message);
      });
  };

  const handleDeleteIngredient = async (ingredientId: number) => {
    await deleteIngredient(ingredientId)
      .then((res) => {
        if (res?.status === 204) {
          toast.success("Ингредиент удалён");
        }
      })
      .catch((e) => {
        toast.warning(e.message);
      });
  };

  return (
    <form
      className="form-container mt-4 p-4 "
      onSubmit={handleSubmit(handleUpldate)}
    >
      <input
        type="text"
        id="title"
        className="mb-3 form-input"
        placeholder="Название рецепта"
        {...register("name")}
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        type="number"
        id="time"
        className="mb-3 form-input"
        placeholder="Время готовки (мин.)"
        {...register("cookingTime")}
      />
      {errors.cookingTime && <p>{errors.cookingTime.message}</p>}

      <input
        type="file"
        id="image"
        className="mb-3 form-input"
        placeholder="Фото"
        {...register("image")}
      />

      {recipe?.image && (
        <div className="mb-3">
          <img src={getImageUrl(recipe.image)} alt={recipe.name} width={150} />
        </div>
      )}
      
      {errors.image && <p>{errors.image.message}</p>}

      <div className="mb-4 description-container">
        <textarea
          id="text"
          rows={6}
          className="form-textarea"
          placeholder="Описание рецепта..."
          {...register("text")}
        ></textarea>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="mb-3 flex ingredient-field">
          <input
            type="text"
            placeholder="Название ингредиента"
            {...register(`ingredients.${index}.name` as const)}
            className="mb-3 form-input"
          />
          <input
            type="number"
            placeholder="Количество"
            {...register(`ingredients.${index}.quantity` as const)}
            className="mb-3 form-input"
          />
          <input
            type="text"
            placeholder="Единица измерения"
            {...register(`ingredients.${index}.unit` as const)}
            className="mb-3 form-input"
          />
          <button
            type="button"
            onClick={() => {
              if(recipe?.recipeIngredients[index]?.id != null)
                handleDeleteIngredient(recipe?.recipeIngredients[index].id);
              remove(index);
            }}
            className="mb-3 remove-button"
          >
            Удалить
          </button>
        </div>
      ))}

      <div className="button-group">
        <button
          type="button"
          onClick={() => append({ name: "", quantity: 0, unit: "" })}
          className="add-button"
        >
          Добавить ингредиент
        </button>
        <button type="submit" className="submit-button">
          Обновить рецепт
        </button>
      </div>
    </form>
  );
};

export default CreatePage;
