import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Logo from "../../images/ico/logo_small.jpeg";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "13px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "250px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    auth.logout();
  };
  let initials = "";
  if (auth.path !== "/login") {
    if (localStorage.getItem("username")) {
      let name = localStorage.getItem("username");
      let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
      initials = [...name.matchAll(rgx)] || [];
      initials = (
        (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
      ).toUpperCase();
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} ml={{ xl: "290px" }}>
        {auth.path !== "/login" && (
          <AppBar
            position="static"
            style={{ backgroundColor: "#202020" }}
            elevation={0}
          >
            <Toolbar sx={{ mt: 7 }}>
              <MenuIcon
                sx={{
                  display: { sm: "flex", xl: "none" },
                  flexGrow: 0.2,
                  fontSize: "35px",
                }}
              />
              {/* 
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search> */}
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              ></IconButton>
              {/* <AccountCircleIcon
              sx={{ flexGrow: 0.04, display: { xs: "none", sm: "block" } }}
              onClick={handleClick}
            /> */}
              {/* <Avatar
                sx={{ display: { xs: "none", sm: "block" }, mr: 3 }}
                onClick={handleClick}
                alt="Remy Sharp"
                src={Logo}
              /> */}

                  
          

              <Avatar
                sx={{
                  display: { xs: "none", sm: "flex" },
                  mr: -1,
                  bgcolor: "#D00062",
                }}
                onClick={handleClick}
              >
                <Typography variant="h6" color="white" fontWeight={"bold"}>
                  {initials.charAt(0)}
                </Typography>
              </Avatar>

              {initials.length == 2  ?  
         
              <Avatar
                sx={{
                  display: { xs: "none", sm: "flex" },
                  mr: 0,
                  bgcolor: "#1F7196",
                }}
                onClick={handleClick}
              >
                <Typography variant="h6" color="white" fontWeight={"bold"} >
                  {initials.charAt(1)}
                </Typography>
              </Avatar> : <p></p>}

              <Typography
                sx={{ flexGrow: 0.03, display: { xs: "none", sm: "block" } ,ml:3}}
                variant="h6"
                color="#BBBBBB"
                fontWeight={"bold"}
                onClick={handleClick}
              >
                {localStorage.getItem("username")}
              </Typography>
              <NotificationsIcon />
            </Toolbar>
          </AppBar>
        )}
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
}
