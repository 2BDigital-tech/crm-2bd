import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import logoIcon from "../../../src/images/logoIcon.png";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import LeadIcon from "@mui/icons-material/TableChart";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { NavLink } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 290;

const Sidebar = () => {
  const auth = useContext(AuthContext);

  return (
    <Box
      sx={{
        display: {
          base: "none",
          sm: "none",
          xl: "flex",
          xs: "none",
          md: "flex",
        },
      }}
    >
      <CssBaseline />
      {auth.path !== "/login" && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          PaperProps={{
            sx: {
              // borderRadius: "45px",
              // margin: "1%",
              backgroundColor: "#2D2D2D",
            },
          }}
        >
          {/* <CloseIcon  sx={{ color: "white" , }} style={{AlignItems: 'right'}}/> */}

          <a href="dashboard">
            <img className="sidelogo" alt="Crm" src={logoIcon} width="200px" />
          </a>

          <Toolbar />

          <Box sx={{ overflow: "auto" }}>
            <List sx={{ padding: "15px" }}>
              <ListItem disablePadding>
                <Button
                  startIcon={<DashboardIcon style={{ fontSize: 30 }} />}
                  fullWidth
                  variant="contained"
                  style={{
                    textTransform: "capitalize",
                    borderRadius: 15,
                    // backgroundColor:
                    //   auth.path !== "/dashboard" ? "#2d2d2d" : "#D00062",
                    background:
                      auth.path !== "/dashboard"
                        ? "#2d2d2d"
                        : "linear-gradient(to right bottom, #C30772, #615EE0)",
                    fontSize: "18px",
                  }}
                  sx={{
                    border: auth.path !== "/dashboard" ? 0 : 3,
                    borderColor: "#202020",
                    boxShadow: 10,
                    mb: 1,
                    width: "100%",
                    height: 70,
                    "& .MuiButton-startIcon": {
                      position: "absolute",
                      left: "2rem",
                    },
                  }}
                >
                  <NavLink
                    to="/dashboard"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Dashboard
                  </NavLink>
                </Button>
              </ListItem>

              {localStorage.getItem("user_role") === "Administrateur" && (
                <ListItem disablePadding>
                  <Button
                    startIcon={<PersonOutlineIcon style={{ fontSize: 30 }} />}
                    fullWidth
                    variant="contained"
                    style={{
                      textTransform: "capitalize",
                      borderRadius: 15,
                      background:
                        auth.path !== "/users"
                          ? "#2d2d2d"
                          : "linear-gradient(to right bottom, #C30772, #615EE0)",
                      fontSize: "18px",
                    }}
                    sx={{
                      border: auth.path !== "/users" ? 0 : 3,
                      borderColor: "#202020",
                      boxShadow: 0,
                      mb: 1,
                      height: 70,

                      width: "100%",

                      "& .MuiButton-startIcon": {
                        position: "absolute",
                        left: "2rem",
                      },
                    }}
                  >
                    <NavLink
                      to="/users"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Utilisateurs
                    </NavLink>
                  </Button>
                </ListItem>
              )}

              {/* <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon style={text_color} />
                </ListItemIcon>
                <ListItemText primary={"Clients"} style={text_color} />
              </ListItemButton>
            </ListItem> */}

              <ListItem disablePadding>
                <Button
                  startIcon={<LeadIcon style={{ fontSize: 30 }} />}
                  fullWidth
                  variant="contained"
                  style={{
                    textTransform: "capitalize",
                    borderRadius: 15,
                    background:
                      auth.path !== "/leads"
                        ? "#2d2d2d"
                        : "linear-gradient(to right bottom, #C30772, #615EE0)",
                    fontSize: "18px",
                  }}
                  sx={{
                    border: auth.path !== "/leads" ? 0 : 3,
                    borderColor: "#202020",
                    boxShadow: 0,
                    mb: 1,
                    height: 70,

                    width: "100%",

                    "& .MuiButton-startIcon": {
                      position: "absolute",
                      left: "2rem",
                    },
                  }}
                >
                  <NavLink
                    to="/leads"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Leads
                  </NavLink>
                </Button>
              </ListItem>

              <ListItem disablePadding>
                <Button
                  startIcon={<FolderOpenIcon style={{ fontSize: 30 }} />}
                  fullWidth
                  variant="contained"
                  style={{
                    textTransform: "capitalize",
                    borderRadius: 15,
                    background:
                      auth.path !== "/files"
                        ? "#2d2d2d"
                        : "linear-gradient(to right bottom, #C30772, #615EE0)",
                    fontSize: "18px",
                  }}
                  sx={{
                    border: auth.path !== "/files" ? 0 : 3,
                    borderColor: "#202020",
                    height: 70,
                    boxShadow: 0,
                    width: "100%",
                    mb: 1,

                    "& .MuiButton-startIcon": {
                      position: "absolute",
                      left: "2rem",
                    },
                  }}
                >
                  <NavLink
                    to="/files"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Affaires
                  </NavLink>
                </Button>
              </ListItem>

              <ListItem disablePadding>
                <Button
                  startIcon={<BarChartIcon style={{ fontSize: 30 }} />}
                  fullWidth
                  variant="contained"
                  style={{
                    textTransform: "capitalize",
                    borderRadius: 15,
                    background:
                      auth.path !== "/data"
                        ? "#2d2d2d"
                        : "linear-gradient(to right bottom, #C30772, #615EE0)",
                    fontSize: "18px",
                  }}
                  sx={{
                    border: auth.path !== "/data" ? 0 : 3,
                    borderColor: "#202020",
                    boxShadow: 0,
                    height: 70,
                    width: "100%",

                    "& .MuiButton-startIcon": {
                      position: "absolute",
                      left: "2rem",
                    },
                  }}
                >
                  <NavLink
                    to="/data"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Données
                  </NavLink>
                </Button>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
