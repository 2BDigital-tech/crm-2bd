import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { months, years, monthsMap } from "../../constants/filter_constants";
import { cities } from "../../constants/filter_constants";
import { withTheme } from "@emotion/react";
import { Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

function getMonthName(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
}

export default function FilterForm(props) {
  const [city, setCity] = React.useState("");
  let curr_month = new Date().getMonth() + 1;
  curr_month = curr_month > 9 ? curr_month : "0" + curr_month;
  const [month, setMonth] = React.useState(getMonthName(monthsMap, curr_month));
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [monthNum, setMonthNum] = React.useState(monthsMap.get(month));

  const submitFilter = () => {
    const obj = JSON.stringify({ city, monthNum, year });
    props.filterInfo(obj);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
    setMonthNum(monthsMap.get(event.target.value));
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const styles = {
    floatingLabelFocusStyle: {
      color: "somecolor",
    },
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: -5.4, width: "25ch", ml: 0, mt: 3 },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          InputLabelProps={{
            style: { color: "#202020" },
          }}
          id="outlined-select-city"
          select
          label="Ville"
          defaultValue={"Ville"}
          variant="filled"
          value={city}
          onChange={handleChangeCity}
          SelectProps={{
            icon: {
              color: "#828182",
            },
          }}
          style={{
            backgroundColor: "#9D9D9D",
            width: "140px",
            borderRadius: "10px",
            height: "55px",
            color: "#9D9D9D",
          }}
        >
          {cities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          InputLabelProps={{
            style: { color: "#202020" },
          }}
          id="outlined-select-month"
          select
          variant="filled"
          label="Mois"
          value={month}
          onChange={handleChangeMonth}
          SelectProps={{
            native: true,
            icon: {
              color: "black",
            },
          }}
          style={{
            backgroundColor: "#9D9D9D",
            width: "160px",
            height: "55px",
            color: "white",
          }}
        >
          {months.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          InputLabelProps={{
            style: { color: "#202020" },
          }}
          id="outlined-select-year"
          select
          variant="filled"
          label="Annee"
          value={year}
          onChange={handleChangeYear}
          SelectProps={{
            native: true,
          }}
          style={{
            backgroundColor: "#9D9D9D",
            color: "white",
            width: "140px",
            height: "55px",
          }}
        >
          {years.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button
          variant="contained"
          onClick={submitFilter}
          style={{
            marginTop: "24px",
            marginLeft: "-20px",
            height: "55px",
            width: "105px",
            alignContent: "auto",
            textTransform: "capitalize",
            borderRadius: 10,
            background: "linear-gradient(to right bottom, #C30772, #615EE0)",
            fontSize: "15px",
          }}
          endIcon={<TuneIcon />}
        >
          Filtrer
        </Button>
      </div>
    </Box>
  );
}
