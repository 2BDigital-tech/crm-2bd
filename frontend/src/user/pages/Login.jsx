/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import Bg from "../src/images/bg.jpeg"
import logoIcon from "../../../src/images/logoIcon.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { createMuiTheme } from "@mui/material/styles";
import "./Login.css";
import { useHttpClient } from "../../hooks/http-hook";
import { useState } from "react";
import { Input } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import Footer from "../../Components/Footer";

const Login = () => {
  const auth = useContext(AuthContext);
  let navigate = useNavigate();

  const customTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#36454B",
        contrastText: "#fff",
        boxShadow: "#202020",
      },
      secondary: {
        light: "#55dab3",
        main: "#00a883",
        dark: "#007856",
        contrastText: "#000",
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [data, setData] = React.useState("");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        "POST",
        JSON.stringify({
          email: email,
          password: password,
        }),
        false
      );
      if (responseData) {
        navigate("/dashboard");
        auth.login(
          responseData.token,
          responseData.userName,
          responseData.role,
          responseData.userId,
          responseData.city
        );
        // localStorage.setItem("username", responseData.userName);
      }
    } catch (err) {
      console.log(err);
    }
    // onSubmitRegister(thisData);
  };

  const styles = {
    paperContainer: {
      backgroundSize: "cover",
      backgroundImage: `url(${"https://zupimages.net/up/22/32/zyfw.jpeg"})`,
      minHeight: 1200,
    },
    formContainer: {
      padding: "30px",
      paddingTop: "50px",
    },
  };
  const style_form = {
    paperContainer: {
      borderRadius: "25px",
      boxShadow: "9px 9px 9px 3px #202020",
      backgroundColor: "#2D2D2D",
      maxWidth: 590,
      minHeight: 600,
    },
  };

  // const onSubmitRegister = (type) => {
  // 	AuthService.signIn(type.email, type.password)
  // 		.then((auth) => {
  // 			if (auth) {
  // 				console.log("Connected");
  // 				navigate("/");
  // 			} else {
  // 				alert("incorrect password or email");
  // 			}
  // 		})
  // 		.catch((error) => {
  // 			console.log(error);
  // 			alert("incorrect password or email");
  // 		});
  // };

  return (
    <React.Fragment>
      <div style={styles.paperContainer}>
        <div style={styles.formContainer}>
          <img className="center" alt="Crm" src={logoIcon} width="400px" />
          <Typography
            component="h3"
            variant="h3"
            align="none"
            color={"#FFFFFF"}
            marginLeft={"14px"}
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              letterSpacing: 10,
              textTransform: "uppercase",
            }}
          >
            Bienvenue
          </Typography>
          <Container
            component="main"
            maxWidth="xs"
            style={style_form.paperContainer}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {isLoading && <LoadingSpinner asOverlay />}
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color={"#FFFFFF"}
                sx={{
                  marginTop: 6,
                  fontFamily: "",
                  textTransform: "default",
                  marginBottom: 5,
                  fontWeight: "medium",
                  letterSpacing: 7,
                }}
              >
                Connexion
              </Typography>
              <Box component="form" onSubmit={handleSubmitForm} sx={{ mt: 1 }}>
                <Typography
                  component="h6"
                  variant="h6"
                  align="none"
                  color={"#FFFFFF"}
                  marginLeft={"4px"}
                >
                  Email
                </Typography>
                <TextField
                  // value={mail}
                  sx={{
                    label: { color: "#FFFFFF" },
                    input: { color: "#FFFFFF" },
                    notchedOutline: { borderColor: "#f0f !important" },
                  }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  // label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  onChange={emailHandler}
                  error={errors?.email ? true : false}
                  helperText={errors?.email?.message}
                />
                <Typography
                  component="h6"
                  variant="h6"
                  align="none"
                  color={"#FFFFFF"}
                  marginLeft={"4px"}
                  marginTop={"24px"}
                >
                  Mot de Passe
                </Typography>
                <TextField
                  sx={{
                    label: { color: "#FFFFFF" },
                    input: { color: "#FFFFFF" },
                  }}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  value={password}
                  {...register("password", {
                    required: true,
                    minLength: 7,
                    maxLength: 100,
                  })}
                  onChange={passwordHandler}
                  error={errors?.password ? true : false}
                  helperText={errors?.password?.message}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      style={{
                        color: "#ffff",
                        label: { color: "#ffff" },
                      }}
                    />
                  }
                  label={
                    <Typography variant="h7" style={{ color: "#ffff" }}>
                      Se rappeler de moi
                    </Typography>
                  }
                />
                <div>
                  {error && (
                    <h3 style={{ color: "#ffff" }}>
                      Identifiant Invalide, veuillez reessayer
                    </h3>
                  )}
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    textTransform: "capitalize",
                    borderRadius: 35,
                    justifyContent: "center",
                    backgroundColor: "#D00062",
                    padding: "5px",
                    fontSize: "18px",
                  }}
                  sx={{
                    mt: 5,
                    mb: 5,
                    border: 3,
                    borderColor: "#202020",
                    boxShadow: 10,
                  }}
                >
                  Connexion
                </Button>
                <Grid container>
                  <Grid>
                    <Link href="#" variant="body2" color="primary.contrastText">
                      Forgot password?
                    </Link>
                  </Grid>
                  {/* <Grid item>
									<Link href="/auth/signup" variant="body2"  color='primary.contrastText'>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid> */}
                </Grid>
              </Box>
            </Box>
          </Container>
          <Footer sx={{ mt: 8, mb: 4 }} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
