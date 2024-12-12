import React, { SyntheticEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  id: number;
}
const EditRecipeButton = (props: Props) => {
  return (
    <Link
      to={`/recipe/${props.id}/edit/`}
      className="text-2xl text-green-400"
      aria-label="Редактировать"
    >
      <FaEdit />
    </Link>
  );
};

export default EditRecipeButton;
