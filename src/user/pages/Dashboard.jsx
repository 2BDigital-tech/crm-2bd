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
import Todo from "../../shared/UIElements/Todo";
import FilterForm from "../../shared/UIElements/FilterForm";

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import WebIcon from '@mui/icons-material/Web';
import TabIcon from '@mui/icons-material/Tab';
// import TopNav from "../../Components/TopNav/TopNav"
// import ChartKpi from "../../Components/ChartKpi/ChartKpi"
import { Chart } from "react-google-charts";
// import CheckboxList from "../../Components/CheckboxList/CheckboxList";
import { useState } from "react";
import HorsZone from "../../Components/HorsZone/HorsZone";
import { IceCream } from "tabler-icons-react";
import { Title } from "@mantine/core";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#2D2D2D" : "#2D2D2D",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "2px 2px #3D3C3C",
  "&:hover": {
    background:"linear-gradient(to right bottom, #C30772, #615EE0)",
    transform: `scale(1.08)`,
  },
  color: "#ffffff",
}));
export const data = [
  ["Ville", "Lead", "Verifié", "RDV"],
  ["Hors Zones", 45, 0, 0],
  ["", 0, 0, 0],
  ["Paris", 40, 30,20],
  ["", 0, 0, 0],
  ["Metz", 23, 40, 25],
  ["", 0, 0, 0],
  ["Nancy", 33, 45, 29],
  ["", 0, 0, 0],
  ["Strasbourg", 45, 10, 35],
  ["", 0, 0, 0],
  ["Toulon", 15, 10, 35],
];

// export const data = [
//   ["Ville", "Lead", "Verifié", "RDV"],
//   ["Hors Zones", 45, 0, 0],
//   ["Paris", 100, 90,80],
//   ["Metz", 23, 40, 25],
//   ["Nancy", 33, 45, 29,]
//   ["Strasbourg", 45, 10, 35],
//   ["Toulon", 100, 50, 35],
// ];

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
  padding: theme.spacing(1),
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

  const { isLoading, error, sendRequests, clearError } = useHttpClient();
  const [quotationData, setQuotationData] = useState([]);
  const [bookingData, setbookingData] = useState([]);
  const [verify, setVerify] = useState([]);
  const [fb, setfb] = useState([]);
  // const [lignes, setlignes] = useState([]);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await sendRequest("http://localhost:80/api/data");
        // setQuotationData(response);
        console.log(response[3]);
        let arr = [];
        console.log(response[0]);
        let countverify= 0;
        let fb= 0;
        console.log(countverify)
        if (response) {
          response.forEach((element) => {
            if (
              element.contact !== undefined &&
              element.quotation !== undefined 
            ) {
              if(element.estimation !== undefined ){
                countverify++;
              }
              let info = {
                ...element.contact,
                ...element.quotation,
                ...element.estimation,
              };
              arr.push(info);
            }
          });
        }
        console.log(countverify)
        setVerify(countverify)
        setfb(fb)
        setQuotationData(arr);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuotations();
  }, []);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await sendRequest("http://localhost:80/api/booking");
        let arr = [];
        if (response) {
          response.forEach((element) => {
            if (
              element!== undefined 
            ) {
              let info = {
                ...element,
              };
              arr.push(info);
            }
          });
        }
        setbookingData(arr);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookings();
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
      minHeight: "1300",
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
          <Box
            display={{ xl: "flex", sm: "none" }}
            marginBottom={8}
            // height={250}
            sx={{ borderRadius: "1%" }}
            marginLeft="15%"
          >
            {/* <Grid container spacing={2}>
              <FilterForm />
            </Grid> */}
          </Box>

          <Stack ml={{ xl: "290px", md: "290px" }}   sx={{ mt: "-9%" }}>
            <Typography
              variant="h5"
              sx={{ mb: "1%" }}
              fontWeight={"bold"}
              color="#BBBBBB">
              Dashboard
            </Typography>
          <FilterForm />

            <Box sx={{ flexGrow: 1 ,mt:"3%" }}>
      <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 2, sm: 4, md: 10 }}  sx={{ mb: "3%"}} >
          <Grid item xs={2} sm={4} md={2} >
            <Item>  
              <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      Lead{" "}
                    </Typography>
                    <SignalCellularAltIcon sx={{ fontSize: "40px", color:"#BBBBBB",position:"absolute",mt:0,ml:{ sm: 25, md: 10 }}}/>
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                    {quotationData.length}
                    </Typography>
                    </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={2} >
            <Item>
            <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}

                    >
                      Verifié{" "}
                    </Typography>
                    <DoneAllIcon sx={{ fontSize: "40px", color:"#BBBBBB",position:"absolute",mt:0,ml:{ sm: 25, md: 6 }}}
                    />
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}

                    >
                      
                      {(verify)}
                    </Typography>
                    </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={2} >
            <Item>   <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={'left'}
                    >
                      RDV {" "}
                    </Typography>
                    <EventNoteIcon sx={{ fontSize: "40px", color:"#BBBBBB",position:"absolute",mt:1,ml:{ sm: 25, md: 6 }}}/>
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      align={'left'}
                      fontWeight={"bold"}
                    >
                      {bookingData.length}
                    </Typography></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={2} >
            <Item>   <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={'left'}
                    >
                      Facebook{" "}
                    </Typography>
                    <FacebookIcon sx={{ fontSize: "40px", color:"#BBBBBB",position:"absolute",mt:0,ml:{ sm: 25, md: 6 }}}/>
                    <Typography
                      variant="h4"
                      align={'left'}
                      color="#BBBBBB"
                      fontWeight={"bold"}
                    >
                      {fb}
                    </Typography></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={2} >
            <Item>   <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={'left'}
                    >
                      Google{" "}
                    </Typography>
                    <GoogleIcon sx={{ fontSize: "40px", color:"#BBBBBB",position:"absolute",mt:0,ml:{ sm: 25, md: 6 }}}/>
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={'left'}
                    >
                      0
                    </Typography></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={2} >
            <Item>   <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={'left'}
                    >
                      Site {" "}
                    </Typography>
                    <WebIcon sx={{ fontSize: "40px", color:"#BBBBBB",position:"absolute",mt:0,ml:{ sm: 25, md: 6 }}}/>
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={'left'}
                    >
                      0
                    </Typography></Item>
          </Grid>
          <Grid item xs={2} sm={4} md={2} >
            <Item>  
              <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      LBC{" "}
                    </Typography>
                    <TabIcon sx={{ fontSize: "40px", color:"#BBBBBB",position:"absolute",mt:0,ml:{ sm: 25, md: 10 }}}/>
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                    0
                    </Typography>
                    </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={2} >
            <Item>  
              <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      LRL{" "}
                    </Typography>
                    <SignalCellularAltIcon sx={{ fontSize: "40px", color:"#BBBBBB",position:"absolute",mt:0,ml:{ sm: 25, md: 10 }}}/>
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                   0
                    </Typography>
                    </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={2} >
            <Item>  
              <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      MA{" "}
                    </Typography>
                    <SignalCellularAltIcon sx={{ fontSize: "40px", color:"#BBBBBB",position:"absolute",mt:0,ml:{ sm: 25, md: 10 }}}/>
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                    0
                    </Typography>
                    </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={2} >
            <Item>  
              <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      Autres{" "}
                    </Typography>
                    <SignalCellularAltIcon sx={{ fontSize: "40px", color:"#BBBBBB",position:"absolute",mt:0,ml:{ sm: 25, md: 10 }}}/>
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                    0
                    </Typography>
                    </Item>
          </Grid>
      
      </Grid>
    </Box>
{/* 
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
                    /> */}


                    {/* <Chart
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        /> */}
                  {/* </Item2> */}
          

            <Grid container spacing={{ xs: 3, md: 7 }} columns={{ xs: 2, sm: 2, md: 12 }}  >
              <Grid item xs={4}>
                <Item3>
                  <Todo />
                </Item3>
              </Grid>
              <Grid item xs={8}>
                <Item3>         
                <br></br>
                <Title
                   variant="h5"
                   ml={30}
                   color="#BBBBBB"
                   fontWeight={"bold"}
                   >Charts</Title>
                 {/* <Chart
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
                    <br></br>
                    <br></br>
                    <br></br> */}
                    <Chart
                      chartType="BarChart"
                      width="100%"
                      borderRadius="20px"
                      data={data}
                      lloader={<div>Loading Chart</div>}
                      options={{
                        'height':450,
                        spacing:23,
                        legendTextStyle: { color: "#FFF" },
                        titleTextStyle: { color: "#FFF" },
                        isStacked:false,
                        bar: {groupWidth: '100%'},
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
              </Item3>
              {/* <Item3>             
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
                    
              </Item3> */}
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
