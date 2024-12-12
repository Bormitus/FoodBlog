import { useAuth } from "../../Context/useAuth";
import logo from "./logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, user, logout, isAdmin } = useAuth();
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex item-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="" className="h-20" />
          </Link>
          <div className="hidden lg:flex space-x-6">
            <Link
              to="/search/recipes-list"
              className="text-black hover:text-yellow-400"
            >
              Рецeпты
            </Link>
            {isLoggedIn() && isAdmin() && (
              <Link to="/create" className="text-black hover:text-yellow-400">
                Создать рецепт
              </Link>
            )}
          </div>
        </div>
        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="hover:text-darkBlue">Привет, {user?.userName}</div>
            <a
              onClick={logout}
              className="px-8 py-3 font-bold rounded text-white bg-red-400 hover:opacity-70"
            >
              Выход
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link to="/login" className="hover:text-yellow-400">
              Вход
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 font-bold rounded text-white bg-yellow-400 hover:opacity-70"
            >
              Регистрация
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
