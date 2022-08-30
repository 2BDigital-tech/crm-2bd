import React, { useState, useCallback, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import Login from "./user/pages/Login";
import Dashboard from "./user/pages/Dashboard";
import Sidebar from "./Components/sidebar/Sidebar";
import Clients from "./user/pages/Clients";
import SearchAppBar from "./Components/TopNav/TopNav";
import { useNavigate } from "react-router-dom";
import Leads from "./user/pages/Leads";

const App = () => {
  const [token, setToken] = useState();
  const [path, setPath] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState();
  const location = useLocation();
  let navigate = useNavigate();
  // {console.log("/"+link.href.toString().split("/")[3])})
  // console.log(window.location.href);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const login = useCallback((token, username, role, id) => {
    setToken(token);
    localStorage.setItem("token", JSON.stringify({ token: token }));
    localStorage.setItem("username", username);
    localStorage.setItem("user_role", role);
    setUserId(id);
    setUsername(localStorage.getItem("username"));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.setItem("user_role", "");
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    setUsername("");
    navigate("/login");
  }, []);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   if (storedToken) {
  //     login(storedToken);
  //   }
  // }, [login]);

  let routes;
  if (!localStorage.getItem("token")) {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Clients />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/data" element={null} />
        <Route path="/files" element={null} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userName: username,
        path: path,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <SearchAppBar />
      <Sidebar />
      <main>{routes}</main>
    </AuthContext.Provider>
  );
};

export default App;
