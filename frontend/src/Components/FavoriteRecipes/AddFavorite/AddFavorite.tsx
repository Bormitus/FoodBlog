import React, { SyntheticEvent } from "react";

interface Props {
  onFavoriteCreate: (e: SyntheticEvent) => void;
  name: string;
}
const AddFavorite = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
      <form onSubmit={props.onFavoriteCreate}>
        <input readOnly={true} hidden={true} value={props.name} />
        <button
          type="submit"
          className="p-2 px-8 text-white bg-darkBlue rounded-lg hover:opacity-70 focus:outline-none"
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddFavorite;
