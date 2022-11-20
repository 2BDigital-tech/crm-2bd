import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { useHttpClient } from "../../hooks/http-hook";
import Container from "@mui/material/Container";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect } from "react";
import { roles, cities } from "../../constants/user_constants";

const EditUserModal = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [customerName, setCustomerName] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    console.log(props.infos);
    setRole(props.infos.role);
    setEmail(props.infos.email);
    setName(props.infos.name);
    setCustomerName(props.infos.customerName);
    setCity(props.infos.city);
  }, []);

  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const style_form = {
    paperContainer: {
      marginTop: "5%",
      borderRadius: "25px",
      boxShadow: "9px 9px 9px 3px #202020",
      backgroundColor: "#2D2D2D",
      maxWidth: 590,
      minHeight: 600,
    },
  };
  function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `http://localhost:80/api/users/${props.userId}`,
        "PATCH",
        JSON.stringify({
          name: name,
          email: email,
          customerName: customerName,
          role: role,
          city: city,
        }),
        { Authorization: "application/json" }
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
          Modifier l'utilisateur
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
              select
              value={role}
              onChange={roleHandler}
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
                value={customerName}
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
                value={city}
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
              value={name}
              onChange={nameHandler}
              placeholder="Nom"
              style={{
                width: "500px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <TextField
              id="email"
              label="Email*"
              value={email}
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
                Modifier
              </Button>
              {isLoading && <LoadingSpinner asOverlay />}
            </div>
          </Stack>
        </div>
      </Box>
    </Container>
  );
};

export default EditUserModal;
