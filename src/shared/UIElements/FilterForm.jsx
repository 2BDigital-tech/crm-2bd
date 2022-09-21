import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import { Button } from "@mantine/core";
import { months } from "../../constants/filter_constants";
import { years } from "../../constants/filter_constants";
import { cities } from "../../constants/filter_constants";
import { withTheme } from "@emotion/react";
import { Button } from "@mui/material";

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

export default function FilterForm(props) {
  const [city, setCity] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [monthNum, setMonthNum] = React.useState("");

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
        "& .MuiTextField-root": { m: -6, width: "25ch", ml: 0, mt: 3 },
     
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
          // sx={{       borderTop :4, borderLeft :4,   borderBottom :4,   
          //   borderColor: 'white'}}
          SelectProps={{
            icon: {
              color: "#828182",
            },
          }}
          // helperText="Ville"
          style={{
            backgroundColor: "#9D9D9D",
            width: "150px",
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
          // sx={{       borderTop :4, borderBottom :4, 
          //   borderColor: 'white'}}
          value={month}
          onChange={handleChangeMonth}
          SelectProps={{
            native: true,
            icon: {
              color: "black",
            },
          }}
          // helperText="Mois"
          style={{
            backgroundColor: "#9D9D9D",
            width: "150px",
            height: "55px",
            borderRadius: "10px",
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
          // sx={{       borderTop :4, borderBottom :4, 
          //   borderColor: 'white'}}
          variant="filled"
          label="Annee"
          value={year}
          onChange={handleChangeYear}
          SelectProps={{
            native: true,
          }}
          // helperText="Année"
          style={{
            backgroundColor: "#9D9D9D",
            color: "white",
            width: "150px",
            borderRadius: "10px",
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
          // variant="gradient"
          variant="contained"
          // gradient={{ from: "#D00062", to: "indigo" }}
          onClick={submitFilter}
          // height={"100px"}
          // mt={"xl"}
          // size="lg"
          // sx={{       borderTop :4, borderBottom :4, borderRight:4,
          //   borderColor: 'white'}}
          style={{
            marginTop:"24px",
            marginLeft:"-20px",
            height:"55px",
            width:"86px",
            alignContent:"auto",
            textTransform: "capitalize",
            borderRadius: 10,
            background: "linear-gradient(to right bottom, #C30772, #615EE0)",
            fontSize: "15px",
          }}
          // radius={"md"}
        >
          Filtrer
        </Button>
      </div>
    </Box>
  );
}
