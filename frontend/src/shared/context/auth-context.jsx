import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  path: "",
  userName: "",
  userId: "",
  login: () => {},
  logout: () => {},
});
