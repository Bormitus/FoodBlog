import React, { SyntheticEvent } from 'react'

interface Props {
    onFavoriteDelete: (e: SyntheticEvent) => void;
    favoriteValue: string;
  }

const DeleteFavorite = (props: Props) => {
    return (
        <div>
          <form onSubmit={props.onFavoriteDelete}>
            <input hidden={true} value={props.favoriteValue} />
            <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
              X
            </button>
          </form>
        </div>
      );
}

export default DeleteFavorite
