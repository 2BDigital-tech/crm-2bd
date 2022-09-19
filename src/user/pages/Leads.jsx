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

const columns = [
  { field: "quotationId", headerName: "ID", width: 90 },
  {
    field: "firstname",
    headerName: "First name",
    width: 150,
    editable: false,
  },
  {
    field: "lastname",
    headerName: "Last name",
    width: 150,
    editable: false,
  },
  {
    field: "email",
    headerName: "E-mail",
    width: 250,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 180,
    editable: true,
  },
  {
    field: "address",
    headerName: "Addresse",
    width: 300,
    editable: true,
  },
  {
    field: "surface",
    headerName: "Surface",
    width: 150,
    editable: true,
  },
  {
    field: "typology",
    headerName: "Typology",
    width: 80,
  },
  {
    field: "price",
    headerName: "Estimation",
    width: 150,
    type: "number",
    valueFormatter: ({ value }) =>
      value ? parseInt(value) : "Pas d'estimation",
    editable: true,
  },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
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
          "http://localhost:80/api/data",
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
              element.quotation !== undefined
            ) {
              let info = {
                ...element.contact,
                ...element.quotation,
                ...element.estimation,
              };
              // console.log(info);
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
