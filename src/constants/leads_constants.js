export const columns = [
  { field: "quotationId", headerName: "ID", width: 50 },
  {
    field: "firstname",
    headerName: "Prenom",
    width: 150,
    editable: false,
  },
  {
    field: "lastname",
    headerName: "Nom",
    width: 150,
    editable: false,
  },
  {
    field: "date",
    headerName: "Date d'estimation",
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
    headerName: "Telephone",
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
