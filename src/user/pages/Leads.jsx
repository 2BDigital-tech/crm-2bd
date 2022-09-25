import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Stack } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useHttpClient } from "../../hooks/http-hook";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import { Switch } from "@mantine/core";
import HorsZone from "../../Components/HorsZone/HorsZone";
import { columns } from "../../constants/leads_constants";
import { useLocation } from "react-router-dom";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function formatData(data) {
  let arr = [];
  data.forEach((element) => {
    if (element.contact !== undefined && element.quotation !== undefined) {
      const date = element._createdAt.substring(0, 10);
      let info = {
        ...element.contact,
        ...element.quotation,
        ...element.estimation,
        date,
      };
      // console.log(info);
      arr.push(info);
    }
  });
  arr.forEach(function (item, i) {
    item.quotationId = i + 1;
  });
  return arr;
}

export default function Leads() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [quotationData, setQuotationData] = useState([]);
  const [checked, setChecked] = useState(true);

  const styles = {
    paperContainer: {
      backgroundSize: "cover",
      backgroundColor: "#202020",
      minHeight: 1300,
    },
    formContainer: {
      padding: "30px",
      paddingTop: "100px",
      paddingBottom: "50px",
    },
  };

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await sendRequest(
          "http://localhost:80/api/data/getLeads",
          "GET"
        );
        // setQuotationData(response);
        console.log(response.result[0]);
        setQuotationData(formatData(response.result));
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuotations();
  }, []);

  const { state } = useLocation();
  let utmSource = [];

  if (state) {
    console.log("source", state.dataSource);

    switch (state.source) {
      case "leads":
        utmSource = formatData(state.dataSource);
        break;
      case "facebook":
        utmSource = formatData(state.dataSource.facebook);
        break;
      case "google":
        utmSource = formatData(state.dataSource.google);
        break;
      case "website":
        utmSource = formatData(state.dataSource.website);
        break;
      case "lbc":
        utmSource = formatData(state.dataSource.lbc);
        break;
      case "lrl":
        utmSource = formatData(state.dataSource.lrl);
        break;
      case "ma":
        utmSource = formatData(state.dataSource.ma);
        break;
      case "other":
        utmSource = formatData(state.dataSource.other);
        break;
      case "booked":
        utmSource = formatData(state.dataSource.booked);
        break;

      // default:
      //   utmSource = formatData(state.dataSource);
      //   break;
    }
  }

  return (
    <React.Fragment>
      <div style={styles.paperContainer}>
        <div style={styles.formContainer}>
          <Stack ml={{ xl: "290px", md: "290px" }} sx={{ mt: "-8%" }}>
            <Typography
              variant="h5"
              sx={{ mb: "1%" }}
              fontWeight={"bold"}
              color="#BBBBBB"
            >
              Leads
            </Typography>

            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              mb="3%"
              onLabel={"HZ"}
              offLabel={"Lead"}
              size="xl"
              radius="md"
              color="violet"
              margin="md"
            />
            <Box
              sx={{
                height: 800,
              }}
            >
              {isLoading && <LoadingSpinner />}

              {checked ? (
                <DataGrid
                  style={{
                    width: "100%",
                    display: "flex",
                    backgroundColor: "#2d2d2d",
                    borderRadius: "10px",
                    padding: 35,
                    color: "white",
                    backgroundColor: "#393939",
                    height: 850,
                  }}
                  rows={utmSource.length !== 0 ? utmSource : quotationData}
                  columns={columns}
                  pageSize={11}
                  rowsPerPageOptions={[10]}
                  //   checkboxSelection
                  getRowId={(row) => row.quotationId}
                  disableSelectionOnClick
                  components={{ Toolbar: CustomToolbar }}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              ) : (
                <HorsZone />
              )}
            </Box>
          </Stack>
        </div>
      </div>
    </React.Fragment>
  );
}
