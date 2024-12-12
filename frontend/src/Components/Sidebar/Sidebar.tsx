import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

const Sidebar = () => {
  return (
    <nav className="relative bg-white shadow-md p-4 flex flex-col space-y-4">
      <Link
        to="recipes-list"
        className="text-gray-700 flex items-center hover:text-yellow-400 active:text-yellow-400"
      >
        <FaSearch className="mr-2" />
        <span>Поиск рецептов</span>
      </Link>
      <Link
        to="favorite-recipes"
        className="text-gray-700 flex items-center hover:text-yellow-400 active:text-yellow-400"
      >
        <MdFavorite className="mr-2" />
        <span>Избранные рецепты</span>
      </Link>
    </nav>
  );
};

export default Sidebar;