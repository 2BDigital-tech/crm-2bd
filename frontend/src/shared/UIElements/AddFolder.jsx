import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { useHttpClient } from "../../hooks/http-hook";
import Container from "@mui/material/Container";
import LoadingSpinner from "./LoadingSpinner";
import Chip from "@mui/material/Chip";
import { useEffect } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";

const style_form = {
  paperContainer: {
    marginTop: "3%",
    borderRadius: "25px",
    boxShadow: "9px 9px 9px 3px #202020",
    backgroundColor: "#2D2D2D",
    maxWidth: 590,
    minHeight: 600,
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddFolder = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [folderName, setFolderName] = useState([]);
  const [readers, setReaders] = useState([]);
  const [users, setUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const theme = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
        setUsers(response.users);
        console.log(response.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  let usernames = [];
  users?.forEach((element) => {
    usernames.push(element.name);
  });
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/folders/addFolder`,
        "POST",
        JSON.stringify({
          folderName: folderName,
          readers: readers,
        }),
        false
      );
      console.log(responseData);
      if (responseData) {
        props.closeModal(false);
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const folderNameHandler = (event) => {
    setFolderName(event.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setReaders(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClose = () => {
    props.closeModal(false);
  };

  return (
    <Container component="main" maxWidth="xs" style={style_form.paperContainer}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2 },
        }}
        noValidate
        autoComplete="off"
      >
        <IconButton onClick={handleClose}>
          <CloseIcon style={{ color: "white" }} />
        </IconButton>
        <Typography
          variant="h5"
          fontWeight="bold"
          style={{ padding: "50px", color: "white" }}
        >
          Nouveau dossier
        </Typography>
        <div>
          <Stack
            component="form"
            sx={{
              width: "100%",
              height: "100%",
            }}
            noValidate
            autoComplete="off"
            alignItems="center"
          >
            <TextField
              id="nom"
              label="Nom*"
              onChange={folderNameHandler}
              value={folderName}
              style={{
                width: "500px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />

            <FormControl>
              <InputLabel>Lecteurs*</InputLabel>
              <Select
                id="demo-multiple-chip"
                multiple
                value={readers}
                onChange={handleChange}
                // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                style={{
                  label: "Lecteurs*",
                  width: "500px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              >
                {usernames?.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    // style={getStyles(name, readers, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Button
                variant="contained"
                style={{
                  display: "flex",
                  marginTop: "10px",
                  backgroundColor: "#F6E2E2",
                  marginRight: "2rem",
                  color: "black",
                }}
                onClick={handleClose}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{
                  display: "flex",
                  marginTop: "10px",
                  backgroundColor: "#D00062",
                }}
                onClick={submitHandler}
              >
                Enregistrer
              </Button>
              {isLoading && <LoadingSpinner asOverlay />}
            </div>
          </Stack>
        </div>
      </Box>
    </Container>
  );
};

export default AddFolder;
