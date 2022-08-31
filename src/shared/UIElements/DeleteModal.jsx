import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { useHttpClient } from "../../hooks/http-hook";
import Container from "@mui/material/Container";
import LoadingSpinner from "./LoadingSpinner";

const DeleteModal = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  const style_form = {
    paperContainer: {
      marginTop: "10%",
      borderRadius: "25px",
      boxShadow: "9px 9px 9px 3px #202020",
      backgroundColor: "#2D2D2D",
      maxWidth: 590,
      minHeight: 300,
    },
  };
  const roles = [{ value: "Client" }, { value: "Administrateur" }];
  function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:80/api/users",
        "DELETE",
        JSON.stringify({
          userId: props.userToDelete,
        }),
        { "Content-Type": "application/json" }
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
          variant="h4"
          fontWeight="bold"
          textAlign={"center"}
          style={{ padding: "50px", color: "white" }}
        >
          Êtes vous sur de vouloir supprimer cette utilisateur ?
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
                Oui
              </Button>
              {isLoading && <LoadingSpinner asOverlay />}
            </div>
          </Stack>
        </div>
      </Box>
    </Container>
  );
};

export default DeleteModal;
