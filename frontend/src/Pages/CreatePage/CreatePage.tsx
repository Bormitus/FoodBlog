import { useFieldArray, useForm } from "react-hook-form";
import { postRecipeAPI } from "../../Services/RecipeService";
import { toast } from "react-toastify";
import { postIngredient } from "../../Services/IngredientService";
import { RecipeIngredientPost } from "../../Models/RecipeIngredient";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate

type RecipeFormInputs = {
  image: FileList;
  name: string;
  cookingTime: number;
  text: string;
  ingredients: RecipeIngredientPost[];
};

const CreatePage = () => {
  const navigate = useNavigate(); 
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipeFormInputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const handleCreate = async (e: RecipeFormInputs) => {
    let ingredientIsFailed = false;
    postRecipeAPI(e.image[0], e.name, e.cookingTime, e.text)
      .then(async (res) => {
        if (res?.status === 201) {
          toast.success("Рецепт был создан");
          const recipeId = res.data.id;
          for (const ingredient of e.ingredients) {
            await postIngredient(
              ingredient.name,
              ingredient.quantity,
              ingredient.unit,
              recipeId
            )
              .then((res) => {
                if (res?.status === 201) {
                  toast.success("Ингредиент создан");
                }
              })
              .catch((e) => {
                ingredientIsFailed = true;
                toast.warning("Ошибка при добавлении ингредиентов");
              });
          }
          if (ingredientIsFailed) navigate(`/recipe/${recipeId}/edit`);
          else navigate("/");
        }
      })
      .catch((e) => {
        toast.warning(e.message);
      });
  };

  return (
    <form
      className="form-container mt-4 p-4 "
      onSubmit={handleSubmit(handleCreate)}
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
            onClick={() => remove(index)}
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
          Создать рецепт
        </button>
      </div>
    </form>
  );
};

export default CreatePage;
