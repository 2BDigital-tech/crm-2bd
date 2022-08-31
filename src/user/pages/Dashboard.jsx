/* eslint-disable no-unused-vars */
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import logoIcon from "../../../src/images/logoIcon.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createMuiTheme } from "@mui/material/styles";
import Footer from "../../Components/Footer";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./Dashboard.css";
import { Divider } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";

// import TopNav from "../../Components/TopNav/TopNav"
// import ChartKpi from "../../Components/ChartKpi/ChartKpi"
import { Chart } from "react-google-charts";
// import CheckboxList from "../../Components/CheckboxList/CheckboxList";
import { useState } from "react";
import Todo from "../../Components/Todo/Todo";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#2D2D2D" : "#2D2D2D",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "2px 2px #3D3C3C",
  "&:hover": {
    background: "#D00062",
    transform: `scale(1.08)`,
  },
  color: "#ffffff",
}));
export const data = [
  ["Year", "User", "Files", "Folder"],
  ["Janvier", 10, 20, 100],
  ["Fevrier", 23, 40, 250],
  ["Mars", 33, 45, 290],
  ["Avril", 45, 100, 350],
];
// export const options = {
//   backgroundColor:'0000000',

// };

const Item4 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#D00062" : "#D00062",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "2px 2px #3D3C3C",
  "&:hover": {
    background: "#2D2D2D",
    transform: `scale(1.08)`,
  },
  color: "#2D2D2D",
}));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#2D2D2D" : "#2D2D2D",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  borderRadius: "20px",
  textAlign: "center",
  color: "#ffffff",
  boxShadow: "2px 2px #3D3C3C",
}));

const Item3 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#2D2D2D" : "#2D2D2D",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  borderRadius: "20px",
  verticalAlign: "text-bottom",
  justifyContent: "center",
  color: "#ffffff",
  boxShadow: "2px 2px #3D3C3C",
}));

const Dashboard = () => {
  const [numOfUsers, setNumOfUsers] = useState();
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest("http://localhost:80/api/users");
        setNumOfUsers(response.users.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

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

  const styles = {
    paperContainer: {
      backgroundSize: "cover",
      backgroundColor: "#202020",
      // backgroundImage: `url(${"https://zupimages.net/up/22/32/zyfw.jpeg"})`,

      minHeight: 2200,
    },
    formContainer: {
      padding: "30px",
      paddingTop: "50px",
      paddingBottom: "50px",
    },
  };

  return (
    <React.Fragment>
      <div style={styles.paperContainer}>
        <div style={styles.formContainer}>
          <Stack ml={{ xl: "290px", md: "290px" }}>
            <Typography
              variant="h5"
              sx={{ mb: "2%" }}
              fontWeight={"bold"}
              color="#BBBBBB"
            >
              Dashboard
            </Typography>

            <Grid
              container
              columnSpacing={{ xs: 2, sm: 3, md: 4 }}
              // display={{ xs: "flex", sm: "none", md: "flex" }}
            >
              <Grid
                item
                xs={3}
                // item xs={{ xl: 4, sm: 2 }}
                sx={{ mb: "5%" }}
              >
                <Grid item xs={12} sx={{ mb: "5%" }}>
                  <Item className="">
                    <Typography
                      variant={"h5"}
                      fontWeight={"bold"}
                      fontFamily="revert-layer"
                      color="#BBBBBB"
                      align="center"
                      sx={{ mb: "2%" }}
                      // sx={{ typography: { sm: '10', xs: '3' } }}
                    >
                      Dossier récent
                    </Typography>
                    <Divider color="#BBBBBB" sx={{ mb: "5%" }} />
                    <Typography variant="p" color="#BBBBBB">
                      Dossier récent
                    </Typography>
                  </Item>
                </Grid>

                <Grid item xs={12}>
                  <Item>
                    <Typography
                      variant="h5"
                      fontWeight={"bold"}
                      color="#BBBBBB"
                      sx={{ mb: "3%" }}
                    >
                      Messages récent
                    </Typography>
                    <Divider color="#BBBBBB" sx={{ mb: "5%" }} />
                    <Typography variant="p" color="#BBBBBB">
                      Message récent
                    </Typography>
                  </Item>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid item xs={12} sx={{ mb: "6%" }}>
                  <Item>
                    <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                    >
                      Clients{" "}
                    </Typography>
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                    >
                      {numOfUsers}
                    </Typography>
                  </Item>
                </Grid>

                <Grid item xs={12}>
                  <Item>
                    <Typography
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      sx={{ mb: "2%" }}
                    >
                      Nouveaux utilisateurs
                    </Typography>
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                    >
                      4
                    </Typography>
                  </Item>
                </Grid>
              </Grid>

              <Grid
                item
                xs={6}
                // display={{ xs: "flex", sm: "none", md: "flex" }}
              >
                <Grid item xs={12}>
                  <Item2>
                    <Chart
                      chartType="BarChart"
                      width="100%"
                      borderRadius="20px"
                      height="100%"
                      data={data}
                      lloader={<div>Loading Chart</div>}
                      options={{
                        legendTextStyle: { color: "#FFF" },
                        titleTextStyle: { color: "#FFF" },

                        vAxis: {
                          textStyle: { color: "#FFF" },
                        },
                        hAxis: {
                          textStyle: { color: "#FFF" },
                        },

                        chartArea: {
                          title: "Data",
                        },
                        backgroundColor: {
                          fill: "transparent",
                        },
                        chart: {
                          backgroundColor: {
                            fill: "transparent",
                          },
                          title: "Data",
                          fill: "#0000000",
                        },
                        colors: ["#1F7196", "#D00062", "#4991B9"],
                      }}
                    />

                    {/* <Chart
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        /> */}
                  </Item2>
                </Grid>
              </Grid>
            </Grid>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4}>
                <Item3>
                  <Todo />
                </Item3>
              </Grid>
              <Grid item xs={8}>
                <Item3>Fichier Uploadé récement</Item3>
              </Grid>
            </Grid>
            <CssBaseline />

            <Footer sx={{ mt: 8, mb: 4 }} />
          </Stack>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
