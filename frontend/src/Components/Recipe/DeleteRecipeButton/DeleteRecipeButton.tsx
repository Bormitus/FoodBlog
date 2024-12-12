import React, { SyntheticEvent } from "react";
import { MdDeleteForever } from "react-icons/md";

interface Props {
  id: number;
  deleteRecipe: (id: number) => void;
}
const DeleteRecipeButton: React.FC<Props> = (props:Props) => {
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    props.deleteRecipe(props.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input readOnly={true} hidden={true} />
      <button
        type="submit"
        className="text-2xl text-red-400"
        aria-label="Удалить рецепт"
      >
        <MdDeleteForever/>
      </button>
    </form>
  );
};

export default DeleteRecipeButton;
