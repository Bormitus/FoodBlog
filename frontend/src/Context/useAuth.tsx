import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { UserProfile } from "../Models/User";
import { loginAPI, registerAPI } from "../Services/AuthService";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
  getUsername: () => string;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [firstRender, setFirstRender] = useState(true);


  useEffect(() => {
    if (firstRender) {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (user && token) {
          setUser(JSON.parse(user));
          setToken(token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      }
      setFirstRender(false);
    }
    setIsReady(true);
  }, [firstRender]);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const res = await registerAPI(email, username, password);
      if (res) {
        localStorage.setItem("token", res?.data.token);
        const userObj = {
          userName: res?.data.username,
          email: res?.data.email,
          role: "User",
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res?.data.token!);
        setUser(userObj);
        axios.defaults.headers.common["Authorization"] = "Bearer " + res?.data.token;
        toast.success("Регистрация прошла успешно, вход выполнен!");
        navigate("/search/recipes-list");
      }
    } catch (e) {
      toast.warning("Ошибка сервера");
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const res = await loginAPI(username, password);
      if (res) {
        localStorage.setItem("token", res?.data.token);
        const userObj = {
          userName: res?.data.username,
          email: res?.data.email,
          role: res?.data.role,
        };

        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res?.data.token!);
        setUser(userObj);
        axios.defaults.headers.common["Authorization"] = "Bearer " + res?.data.token;
        toast.success("Вход выполнен!");
        navigate("/search/recipes-list");

      }
    } catch (e) {
      toast.warning("Ошибка сервера");
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const getUsername = () => {
    return user!.userName;
  };

  const isAdmin = () => {
    return user?.role === "Admin";
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, isAdmin, registerUser, getUsername }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);