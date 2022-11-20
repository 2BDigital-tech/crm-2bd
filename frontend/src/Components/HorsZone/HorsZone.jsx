import * as React from "react";
import Box from "@mui/material/Box";
import { Title } from "@mantine/core";
import moment from "moment";
import { Typography, Stack } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useHttpClient } from "../../hooks/http-hook";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import { PartyModeSharp } from "@mui/icons-material";
import { Button } from "@mantine/core";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const handleClick = (cell) => {
  alert(cell);
  console.log(cell);
};
const columns = [
  {
    field: "quotationId",
    headerName: "ID",
    width: 125,
    minWidth: 150,
    maxWidth: 300,
  },
  {
    field: "_createdAt",
    headerName: "Date",
    width: 120,
    editable: true,
    valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
  },

  {
    field: "email",
    headerName: "E-mail",
    width: 150,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
    editable: true,
  },

  {
    field: "address",
    headerName: "Adress",
    width: 285,
  },
  {
    field: "Voir",
    width: 115,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="gradient"
          gradient={{ from: "#D00062", to: "indigo" }}
          onClick={(event) => {
            // handleClick(cellValues);
            alert();
          }}
        >
          Voir
        </Button>
      );
    },
  },
  //     {
  //     field: "address",
  //     headerName: "Code Postal",
  //     width: 140,
  //     editable: true,
  //     valueFormatter: params =>
  //      params?.value.split(' ').pop(),
  //   },
];
function HorsZone() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [quotationData, setQuotationData] = useState([]);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/data`,
          "GET"
        );
        // setQuotationData(response);
        console.log(response[3]);
        let arr = [];
        console.log(response[0]);
        if (response) {
          response.result.forEach((element) => {
            if (
              element.contact !== undefined &&
              element.quotation !== undefined &&
              element.contact.project == "Hors Zone"
            ) {
              let info = {
                ...element,
                ...element.contact,
                ...element.quotation,
                ...element.estimation,
              };
              arr.push(info);
            }
          });
        }
        setQuotationData(arr);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuotations();
  }, []);
  return (
    <React.Fragment>
      <Box
        sx={{
          height: 510,
          padding: 3,
        }}
      >
        <Title variant="h5" color="#BBBBBB" fontWeight={"bold"} mb="lg">
          Hors Zones{" "}
        </Title>
        {isLoading && <LoadingSpinner />}
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              style={{
                width: "100%",
                display: "flex",
                backgroundColor: "#25262B",
                borderRadius: "10px",
                padding: 35,
                color: "white",
                backgroundColor: "#25262B",
                border: "none",
                height: 419,
              }}
              rows={quotationData}
              columns={columns}
              pageSize={11}
              rowsPerPageOptions={[10]}
              //   checkboxSelection
              getRowId={(row) => row.quotationId}
              disableSelectionOnClick
              components={{ Toolbar: CustomToolbar }}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </div>
        </div>
      </Box>
    </React.Fragment>
  );
}

export default HorsZone;
