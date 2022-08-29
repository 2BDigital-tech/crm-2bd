import React, { useEffect, useContext } from "react";
import {
  Button,
  Stack,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import Footer from "../../Components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import AddUserModal from "../../shared/UIElements/AddUserModal";
import SearchBar from "../../shared/UIElements/SearchBar";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteModal from "../../shared/UIElements/DeleteModal";
import { Center } from "@chakra-ui/react";
import EditUserModal from "../../shared/UIElements/EditUserModal";
import { AuthContext } from "../../shared/context/auth-context";

const styles = {
  paperContainer: {
    backgroundSize: "cover",
    backgroundColor: "#202020",
    minHeight: 2200,
  },
  formContainer: {
    padding: "30px",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
};

const Clients = () => {
  const [users, setUsers] = useState();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [openSideModals, setOpenSideModals] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userInfo, setUserInfo] = useState("");
  const [openDelete, setOpenDelete] = useState();
  const [userSearch, setUserSearch] = useState("");
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest("http://localhost:5002/api/users");
        setUsers(response.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  //handle add User Modal opening and closing
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //handle Edit and Delete modals opening and closing
  const handleOpenSideModals = (id, infos = {}, action) => {
    setUserId(id);
    setOpenSideModals(true);
    setUserInfo(infos);
    action === "clear" && setOpenDelete(true);
    action === "edit" && setOpenDelete(false);
  };

  const handleCloseSideModals = () => {
    setOpenSideModals(false);
  };

  return (
    <React.Fragment>
      <div style={styles.paperContainer}>
        <div style={styles.formContainer}>
          <Stack ml={{ xl: "290px", md: "290px" }}>
            <Typography
              variant="h4"
              sx={{ mb: "4%", ml: "2%" }}
              color="#ffff"
              fontWeight={"bold"}
            >
              Utilisateurs
            </Typography>{" "}
            <Box
              display={{ xl: "flex", sm: "none" }}
              bgcolor="#2D2D2D"
              marginBottom={8}
              height={120}
              sx={{ borderRadius: "1%" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    style={{
                      margin: "30px",
                      backgroundColor: "#D00062",
                    }}
                    onClick={handleOpen}
                  >
                    <Typography variant="h6" color="#ffff" fontWeight={"bold"}>
                      Ajouter
                    </Typography>{" "}
                  </Button>{" "}
                </Grid>
                <Grid item xs={8}>
                  <SearchBar searchUser={setUserSearch} />
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    variant="h6"
                    color="#ffff"
                    fontWeight={"bold"}
                    style={{ margin: "40px", marginLeft: "10%" }}
                  >
                    {users?.length} Lignes
                  </Typography>{" "}
                </Grid>
              </Grid>
            </Box>
            <Box
              bgcolor="#2D2D2D"
              marginBottom={4}
              sx={{ borderRadius: "5%" }}
              display={{ xl: "none", sm: "block" }}
            >
              <Stack padding={4} sx={{ borderRadius: "5%" }}>
                <Typography
                  variant="h6"
                  color="#ffff"
                  fontWeight={"bold"}
                  style={{ textAlign: "center" }}
                >
                  {users?.length} Lignes
                </Typography>{" "}
                <SearchBar />
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  style={{
                    borderRadius: "10px",
                    marginTop: "1rem",
                    backgroundColor: "#D00062",
                  }}
                  onClick={handleOpen}
                >
                  <Typography variant="h6" color="#ffff" fontWeight={"bold"}>
                    Ajouter
                  </Typography>{" "}
                </Button>{" "}
              </Stack>
            </Box>
            {isLoading && <LoadingSpinner asOverlay />}
            <TableContainer
              style={{
                width: "100%",
                display: "flex",
                backgroundColor: "#2d2d2d",
                borderRadius: "10px",
                padding: 35,
              }}
            >
              <Table style={{ width: "100%" }} aria-label="simple table">
                <TableHead
                  style={{ backgroundColor: "#202020", borderRadius: "30px" }}
                >
                  <TableRow>
                    <TableCell align="left" style={{ color: "white" }}>
                      <Typography
                        variant={{ xl: "h6", sm: "h8" }}
                        sx={{ mb: "4%" }}
                        color="#ffff"
                        fontWeight={"bold"}
                      >
                        NOM
                      </Typography>{" "}
                    </TableCell>
                    <TableCell align="left" style={{ color: "white" }}>
                      <Typography
                        variant={{ xl: "h6", sm: "h8" }}
                        sx={{ mb: "4%" }}
                        color="#ffff"
                        fontWeight={"bold"}
                      >
                        EMAIL
                      </Typography>{" "}
                    </TableCell>
                    <TableCell align="left" style={{ color: "white" }}>
                      <Typography
                        variant={{ xl: "h6", sm: "h8" }}
                        sx={{ mb: "4%" }}
                        color="#ffff"
                        fontWeight={"bold"}
                      >
                        RÔLE
                      </Typography>{" "}
                    </TableCell>
                    <TableCell align="right" style={{ color: "white" }}>
                      <Typography
                        variant={{ xl: "h6", sm: "h8" }}
                        sx={{ mb: "4%" }}
                        color="#ffff"
                        fontWeight={"bold"}
                      >
                        DATE DE CRÉATION
                      </Typography>{" "}
                    </TableCell>
                    <TableCell align="right" style={{ color: "white" }}>
                      <Typography
                        variant={{ xl: "h6", sm: "h8" }}
                        sx={{ mb: "4%" }}
                        color="#ffff"
                        fontWeight={"bold"}
                      >
                        ÉDITER / SUPPRIMER
                      </Typography>{" "}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isLoading &&
                    users &&
                    users
                      .filter(
                        userSearch !== []
                          ? (x) =>
                              x.name
                                .toLowerCase()
                                .startsWith(userSearch.toLowerCase())
                          : (x) => x.name
                      )
                      .map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ color: "white" }}
                          >
                            <Typography
                              variant="h7"
                              sx={{ mb: "4%" }}
                              color="#ffff"
                              fontWeight={"bold"}
                            >
                              {row.name}
                            </Typography>{" "}
                          </TableCell>
                          <TableCell align="left" style={{ color: "white" }}>
                            <Typography
                              variant="h7"
                              sx={{ mb: "4%" }}
                              color="#ffff"
                              fontWeight={"bold"}
                            >
                              {row.email}
                            </Typography>{" "}
                          </TableCell>
                          <TableCell align="left" style={{ color: "white" }}>
                            <Typography
                              variant="h7"
                              sx={{ mb: "4%" }}
                              color="#ffff"
                              fontWeight={"bold"}
                            >
                              {row.role}
                            </Typography>{" "}
                            <Typography
                              variant="h7"
                              sx={{ mb: "4%" }}
                              color="#ffff"
                              fontWeight={"bold"}
                            >
                              {row.customerName !== undefined &&
                              row.customerName !== "null"
                                ? "(" + row.customerName + ")"
                                : ""}
                            </Typography>{" "}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            <Typography
                              variant="h7"
                              sx={{ mb: "4%" }}
                              color="#ffff"
                              fontWeight={"bold"}
                            >
                              {row.creationDate}
                            </Typography>{" "}
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            <EditIcon
                              style={{ marginRight: "25px" }}
                              sx={{
                                "&:hover": {
                                  color: "green",
                                  cursor: "pointer",
                                },
                              }}
                              onClick={() =>
                                handleOpenSideModals(
                                  row._id,
                                  {
                                    role: row.role,
                                    name: row.name,
                                    email: row.email,
                                    customerName: row.customerName,
                                  },
                                  "edit"
                                )
                              }
                            />
                            <ClearIcon
                              sx={{
                                "&:hover": { color: "red", cursor: "pointer" },
                              }}
                              style={{ marginRight: "25px" }}
                              onClick={() =>
                                handleOpenSideModals(row._id, {}, "clear")
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddUserModal closeModal={handleClose} setUserData={setUsers} />
            </Modal>
            <Modal
              open={openSideModals}
              onClose={handleCloseSideModals}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {openDelete ? (
                <DeleteModal
                  closeModal={handleCloseSideModals}
                  userToDelete={userId}
                />
              ) : (
                <EditUserModal
                  closeModal={handleCloseSideModals}
                  userId={userId}
                  infos={userInfo}
                />
              )}
            </Modal>
            {/* <Modal
              open={openSideModals}
              onClose={handleCloseSideModals}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <EditUserModal
                closeModal={handleCloseSideModals}
                userId={userId}
                infos={userInfo}
              />
            </Modal> */}
            {/* <Container
            component="main"
            maxWidth="xs"
            style={style_form.paperContainer}
          > */}
            <CssBaseline />
            {/* </Container> */}
            <Footer sx={{ mt: 8, mb: 4 }} />
          </Stack>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Clients;
