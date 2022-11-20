/* eslint-disable no-unused-vars */
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { createMuiTheme } from "@mui/material/styles";
import Footer from "../../Components/Footer";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./Dashboard.css";
import { Stack } from "@mui/material";
import { useEffect, useReducer } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import Todo from "../../shared/UIElements/Todo";
import FilterForm from "../../shared/UIElements/FilterForm";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import WebIcon from "@mui/icons-material/Web";
import TabIcon from "@mui/icons-material/Tab";
import ChartData, { data } from "../../Components/ChartData/ChartData";
import { useState } from "react";
import { Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#2D2D2D" : "#2D2D2D",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "2px 2px #3D3C3C",
  "&:hover": {
    background: "linear-gradient(to right bottom, #C30772, #615EE0)",
    transform: `scale(1.08)`,
  },
  color: "#ffffff",
}));

const dataUtmFilter = (state, action) => {
  return {
    ...state,
    facebook: action.facebook,
    google: action.google,
    website: action.website,
    lbc: action.lbc,
    lrl: action.lrl,
    ma: action.ma,
    other: action.other,
    booked: action.booked,
  };
};

const Item4 = styled(Paper)(({ theme }) => ({
  backgroundColor: "#2D2D2D",
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
  backgroundColor: "#2D2D2D",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  borderRadius: "20px",
  textAlign: "center",
  color: "#ffffff",
  boxShadow: "2px 2px #3D3C3C",
}));

const Item3 = styled(Paper)(({ theme }) => ({
  backgroundColor: "#2D2D2D",
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
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
  const [verify, setVerify] = useState(0);
  const [fb, setfb] = useState([]);
  const [filter, setFilter] = useState();

  const [dataUtm, dispatch] = useReducer(dataUtmFilter, {
    facebook: [],
    google: [],
    website: [],
    lbc: [],
    lrl: [],
    ma: [],
    other: [],
    booked: [],
  });

  const fetchFilter = (info) => {
    setFilter(info);
  };

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/data/getQuotations`,
          "POST",
          filter
        );

        setQuotationData(response.quotation_data);

        let facebookUtm = response.quotation_data.filter(
          (item) => item.quotation.dataUtm.utm_source === "facebook"
        );
        let googleUtm = response.quotation_data.filter(
          (item) => item.quotation.dataUtm.utm_source === "google"
        );
        let websiteUtm = response.quotation_data.filter(
          (item) => item.quotation.dataUtm.utm_source === "sitweb"
        );
        let lbcUtm = response.quotation_data.filter(
          (item) => item.quotation.dataUtm.utm_source === "LBC"
        );
        let lrlUtm = response.quotation_data.filter(
          (item) => item.quotation.dataUtm.utm_medium === "LRL"
        );
        let maUtm = response.quotation_data.filter(
          (item) =>
            item.quotation.dataUtm.utm_source === "activecampaign" ||
            item.quotation.dataUtm.utm_source === "sendinblue" ||
            item.quotation.dataUtm.utm_campaign ===
              "Rappel Mail non-vérifié1" ||
            item.quotation.dataUtm.utm_campaign ===
              "Rappel Mail non-vérifié2" ||
            item.quotation.dataUtm.utm_campaign === "Rappel Mail non-vérifié3"
        );
        let otherUtm = response.quotation_data.filter(
          (item) => !item.quotation.dataUtm?.utm_source
        );

        let bookedUtm = response.quotation_data.filter((item) =>
          response.book_data.includes(item._id)
        );

        console.log("booked :", bookedUtm);

        dispatch({
          facebook: facebookUtm,
          google: googleUtm,
          website: websiteUtm,
          lbc: lbcUtm,
          lrl: lrlUtm,
          ma: maUtm,
          other: otherUtm,
          booked: bookedUtm,
        });
        let arr = [];

        let countverify = 0;
        let fb = 0;
        if (response.quotation_data) {
          response.quotation_data.forEach((element) => {
            if (
              element.contact !== undefined &&
              element.quotation !== undefined
            ) {
              if (element.estimation !== undefined) {
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

        setVerify(countverify);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuotations();
  }, [filter]);

  const openLead = (source) => {
    let dataSource = [];
    if (source === "leads") {
      dataSource = quotationData;
    } else {
      dataSource = dataUtm;
    }
    navigate("/leads", {
      state: {
        dataSource,
        source,
      },
    });
  };

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

          <Stack ml={{ xl: "290px", md: "290px" }} sx={{ mt: "-9%" }}>
            <Typography
              variant="h5"
              sx={{ mb: "1%" }}
              fontWeight={"bold"}
              color="#BBBBBB"
            >
              Dashboard
            </Typography>

            <FilterForm filterInfo={(obj) => fetchFilter(obj)} />

            <Box sx={{ flexGrow: 1, mt: "3%" }}>
              <Grid
                container
                spacing={{ xs: 3, md: 4 }}
                columns={{ xs: 2, sm: 4, md: 10 }}
                sx={{ mb: "3%" }}
              >
                <Grid item xs={2} sm={4} md={2}>
                  <Item onClick={() => openLead("leads")}>
                    <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      Lead{" "}
                    </Typography>
                    <SignalCellularAltIcon
                      sx={{
                        fontSize: "40px",
                        color: "#BBBBBB",
                        position: "absolute",
                        mt: 0,
                        ml: { sm: 25, md: 10 },
                      }}
                    />
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
                <Grid item xs={2} sm={4} md={2}>
                  <Item onClick={() => openLead("verify")}>
                    <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      Verifié{" "}
                    </Typography>
                    <DoneAllIcon
                      sx={{
                        fontSize: "40px",
                        color: "#BBBBBB",
                        position: "absolute",
                        mt: 0,
                        ml: { sm: 25, md: 6 },
                      }}
                    />
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      {verify}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={2}>
                  <Item onClick={() => openLead("booked")}>
                    {" "}
                    <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      RDV{" "}
                    </Typography>
                    <EventNoteIcon
                      sx={{
                        fontSize: "40px",
                        color: "#BBBBBB",
                        position: "absolute",
                        mt: 1,
                        ml: { sm: 25, md: 6 },
                      }}
                    />
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      align={"left"}
                      fontWeight={"bold"}
                    >
                      {dataUtm.booked.length}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={2}>
                  <Item onClick={() => openLead("facebook")}>
                    {" "}
                    <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      Facebook{" "}
                    </Typography>
                    <FacebookIcon
                      sx={{
                        fontSize: "40px",
                        color: "#BBBBBB",
                        position: "absolute",
                        mt: 0,
                        ml: { sm: 25, md: 6 },
                      }}
                    />
                    <Typography
                      variant="h4"
                      align={"left"}
                      color="#BBBBBB"
                      fontWeight={"bold"}
                    >
                      {dataUtm.facebook.length}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={2}>
                  <Item onClick={() => openLead("google")}>
                    {" "}
                    <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      Google{" "}
                    </Typography>
                    <GoogleIcon
                      sx={{
                        fontSize: "40px",
                        color: "#BBBBBB",
                        position: "absolute",
                        mt: 0,
                        ml: { sm: 25, md: 6 },
                      }}
                    />
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      {dataUtm.google.length}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={2}>
                  <Item onClick={() => openLead("website")}>
                    {" "}
                    <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      Site{" "}
                    </Typography>
                    <WebIcon
                      sx={{
                        fontSize: "40px",
                        color: "#BBBBBB",
                        position: "absolute",
                        mt: 0,
                        ml: { sm: 25, md: 6 },
                      }}
                    />
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      {dataUtm.website.length}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={2}>
                  <Item onClick={() => openLead("lbc")}>
                    <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      LBC{" "}
                    </Typography>
                    <TabIcon
                      sx={{
                        fontSize: "40px",
                        color: "#BBBBBB",
                        position: "absolute",
                        mt: 0,
                        ml: { sm: 25, md: 10 },
                      }}
                    />
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      {dataUtm.lbc.length}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={2}>
                  <Item onClick={() => openLead("lrl")}>
                    <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      LRL{" "}
                    </Typography>
                    <SignalCellularAltIcon
                      sx={{
                        fontSize: "40px",
                        color: "#BBBBBB",
                        position: "absolute",
                        mt: 0,
                        ml: { sm: 25, md: 10 },
                      }}
                    />
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      {dataUtm.lrl.length}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={2}>
                  <Item onClick={() => openLead("ma")}>
                    <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      MA{" "}
                    </Typography>
                    <SignalCellularAltIcon
                      sx={{
                        fontSize: "40px",
                        color: "#BBBBBB",
                        position: "absolute",
                        mt: 0,
                        ml: { sm: 25, md: 10 },
                      }}
                    />
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      {dataUtm.ma.length}
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={2}>
                  <Item onClick={() => openLead("other")}>
                    <Typography
                      sx={{ mb: "2%" }}
                      variant="h5"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      Autres{" "}
                    </Typography>
                    <SignalCellularAltIcon
                      sx={{
                        fontSize: "40px",
                        color: "#BBBBBB",
                        position: "absolute",
                        mt: 0,
                        ml: { sm: 25, md: 10 },
                      }}
                    />
                    <Typography
                      variant="h4"
                      color="#BBBBBB"
                      fontWeight={"bold"}
                      align={"left"}
                    >
                      {dataUtm.other.length}
                    </Typography>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            <Grid
              container
              spacing={{ xs: 3, md: 7 }}
              columns={{ xs: 2, sm: 2, md: 12 }}
            >
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
                  >
                    Chart
                  </Title>
                  <ChartData />
                </Item3>
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
