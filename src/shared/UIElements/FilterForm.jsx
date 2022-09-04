import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { months } from "../../constants/filter_constants";
import { years } from "../../constants/filter_constants";
import { cities } from "../../constants/filter_constants";

const monthsMap = new Map();
monthsMap.set("Janvier", "01");
monthsMap.set("Février", "02");
monthsMap.set("Mars", "03");
monthsMap.set("Avril", "04");
monthsMap.set("Mai", "05");
monthsMap.set("Juin", "06");
monthsMap.set("Juillet", "07");
monthsMap.set("Août", "08");
monthsMap.set("Séptembre", "09");
monthsMap.set("Octobre", "10");
monthsMap.set("Novembre", "11");
monthsMap.set("Décembre", "12");

export default function FilterForm() {
  const [city, setCity] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [monthNum, setMonthNum] = React.useState("");

  const submitFilter = () => {
    console.log({ city, monthNum, year });
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

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      marginLeft={"15%"}
    >
      <div>
        <TextField
          id="outlined-select-city"
          select
          label="Ville"
          value={city}
          onChange={handleChangeCity}
          helperText="Selectionner une ville"
          style={{ backgroundColor: "white" }}
        >
          {cities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-month"
          select
          label="Mois"
          value={month}
          onChange={handleChangeMonth}
          SelectProps={{
            native: true,
          }}
          helperText="Selectionner un mois"
          style={{ backgroundColor: "white" }}
        >
          {months.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-select-year"
          select
          label="Annee"
          value={year}
          onChange={handleChangeYear}
          SelectProps={{
            native: true,
          }}
          helperText="Selectionner une annee"
          style={{ backgroundColor: "white" }}
        >
          {years.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button onClick={submitFilter}> Filtrer</Button>
      </div>
    </Box>
  );
}
