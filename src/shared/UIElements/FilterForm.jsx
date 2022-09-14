import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {Button} from "@mantine/core";
import { months } from "../../constants/filter_constants";
import { years } from "../../constants/filter_constants";
import { cities } from "../../constants/filter_constants";
import { withTheme } from "@emotion/react";

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

  const styles = {
    floatingLabelFocusStyle: {
        color: "somecolor"
    }
}

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 3, width: "25ch" ,ml:0 ,mt:3},
        
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
           InputLabelProps={{
            style: { color: '#fff' },
          }}
          id="outlined-select-city"
          select
          label="Ville"
          value={city}
          onChange={handleChangeCity}
          SelectProps={{
            icon: {
              color: 'white',
            },
          }}
          helperText="Ville"
          style={{ backgroundColor: "#3D3C3C",
          width: "150px",
          borderRadius: "10px",
          height: "55px",
          color:"white"
        
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
            style: { color: 'white' },
          }}
          id="outlined-select-month"
          select
          label="Mois"
          value={month}
          onChange={handleChangeMonth}
          SelectProps={{
            native: true,
            icon: {
              color: 'white',
            },
          }}
          helperText="Mois"
          style={{ backgroundColor: "#3D3C3C", 
          width: "150px",
          height: "55px",
          borderRadius: "10px",
          color:"white"
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
            style: { color: '#fff' },
          }}
          id="outlined-select-year"
          select
          label="Annee"
          value={year}
          onChange={handleChangeYear}
          SelectProps={{
            native: true,
          }}
          helperText="Année"
          style={{ backgroundColor: "#3D3C3C", 
          color:"white",
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
              variant="gradient"
              gradient={{ from: "#D00062", to: "indigo" }}
              onClick={submitFilter}
              height={"100px"}
              mt={"xl"}
              size="lg"
              radius={"md"}
            >
              Filtrer  
            </Button>
      </div>
    </Box>
  );
}
