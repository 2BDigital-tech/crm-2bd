import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "5px",
  backgroundColor: "#404040",
  "&:hover": {
    backgroundColor: "#404040",
  },
  marginLeft: 0,
  marginTop: "10px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "80%",
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

const SearchBar = (props) => {
  const getSearchUser = (event) => {
    props.searchUser(event.target.value);
  };

  return (
    <AppBar
      position="relative"
      style={{
        marginTop: "25px",
        backgroundColor: "#404040",
        height: "65px",
        borderRadius: "10px",
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={getSearchUser}
          placeholder="Rechercher…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </AppBar>
  );
};

export default SearchBar;
