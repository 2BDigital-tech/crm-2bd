import React, { useState, useCallback, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import Login from "./user/pages/Login";
import Dashboard from "./user/pages/Dashboard";
import Sidebar from "./Components/sidebar/Sidebar";
import Users from "./user/pages/Users";
import SearchAppBar from "./Components/TopNav/TopNav";
import { useNavigate } from "react-router-dom";
import Leads from "./user/pages/Leads";
import Folders from "./user/pages/Folders";
import { LocalSeeOutlined } from "@mui/icons-material";
import DashboardExpert from "./user/pages/DashboardExpert";
import FolderView from "./user/pages/FolderView";

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

  const login = useCallback((token, username, role, id, city) => {
    setToken(token);
    localStorage.setItem("token", JSON.stringify({ token: token }));
    localStorage.setItem("username", username);
    localStorage.setItem("user_role", role);
    localStorage.setItem("userId", id);
    role === "Administrateur"
      ? localStorage.setItem("expert_city", "")
      : localStorage.setItem("expert_city", city);
    setUserId(id);
    setUsername(localStorage.getItem("username"));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.setItem("user_role", "");
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("expert_city", "");
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
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("expert_city") ? (
              <DashboardExpert />
            ) : (
              <Dashboard />
            )
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/data" element={null} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/folders/:folderId" element={<FolderView />} />
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
