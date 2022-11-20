import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { useHttpClient } from "../../hooks/http-hook";
import Container from "@mui/material/Container";
import LoadingSpinner from "./LoadingSpinner";
import { roles, cities } from "../../constants/user_constants";

const AddUserModal = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [customerName, setCustomerName] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
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

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:80/api/users/addUser",
        "POST",
        JSON.stringify({
          name: name,
          email: email,
          role: role,
          customerName: customerName ? customerName : "null", // insert null as customer name if admin user is created
          city: city ? city : "null",
          creationDate: date,
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

  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const emailHander = (event) => {
    setEmail(event.target.value);
  };

  const roleHandler = (event) => {
    setRole(event.target.value);
  };

  const customerNameHandler = (event) => {
    setCustomerName(event.target.value);
  };

  const cityHandler = (event) => {
    setCity(event.target.value);
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
          Nouvel utilisateur
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
              id="role"
              label="Role*"
              onChange={roleHandler}
              select
              value={role}
              style={{
                width: "500px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            {role === "Client" && (
              <TextField
                id="company-name"
                label="Nom du client*"
                placeholder="ex:Entreprise"
                style={{
                  width: "500px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
                onChange={customerNameHandler}
              />
            )}
            {role === "Expert" && (
              <TextField
                id="company-name"
                label="Ville*"
                placeholder="Ville*"
                select
                style={{
                  width: "500px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
                onChange={cityHandler}
              >
                {cities.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              id="name"
              label="Nom*"
              placeholder="Nom"
              style={{
                width: "500px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
              onChange={nameHandler}
            />
            <TextField
              id="email"
              label="Email*"
              placeholder="email@domain.com"
              style={{
                width: "500px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
              onChange={emailHander}
            />
            {role === "Client" && (
              <TextField
                id="folders"
                label="Dossiers"
                placeholder="Rechercher un dossier"
                style={{
                  width: "500px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
                // onChange={}
              />
            )}
            {error && <h3 style={{ color: "#ffff" }}>{error}</h3>}
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
                disabled={formIsValid}
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

export default AddUserModal;
