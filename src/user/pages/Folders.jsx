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
import AddFo from "../../shared/UIElements/AddUserModal";
import SearchBar from "../../shared/UIElements/SearchBar";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

import { AuthContext } from "../../shared/context/auth-context";
import AddFolder from "../../shared/UIElements/AddFolder";

const styles = {
  paperContainer: {
    backgroundSize: "cover",
    backgroundColor: "#202020",
    minHeight: 1300,
  },
  formContainer: {
    padding: "30px",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
};

const Folders = () => {
  const [folders, setFolders] = useState();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [openSideModals, setOpenSideModals] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userInfo, setUserInfo] = useState("");
  const [openDelete, setOpenDelete] = useState();
  const [userSearch, setUserSearch] = useState("");
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await sendRequest(
          "http://localhost:80/api/folders/getFolders"
        );
        setFolders(response.foldersList);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFolders();
  }, []);

  let folderObjects = [];
  if (folders) {
    for (var i = 0; i < folders.length; i++) {
      let readers = folders[i].readers;
      let folderObj = { name: folders[i].name, readers_names: "" };
      for (var j = 0; j < readers.length; j++) {
        if (j === readers.length - 1) {
          folderObj.readers_names += readers[j].userName;
        } else {
          folderObj.readers_names += readers[j].userName + ", ";
        }
      }
      folderObjects.push(folderObj);
    }
  }

  // console.log("folders :", folders);

  // folderReaderObj.push({ name: folderName, readers: userString });

  // console.log(folderReaderObj);

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
          <Stack ml={{ xl: "290px", md: "290px" }} sx={{ mt: "-5%" }}>
            <Typography
              variant="h5"
              sx={{ mb: "7%" }}
              fontWeight={"bold"}
              color="#BBBBBB"
            >
              AFFAIRES / DOSSIERS
            </Typography>
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
                      background:
                        "linear-gradient(to right bottom, #C30772, #615EE0)",
                    }}
                    onClick={handleOpen}
                  >
                    <Typography variant="h6" color="#ffff" fontWeight={"bold"}>
                      Ajouter
                    </Typography>{" "}
                  </Button>{" "}
                </Grid>
                <Grid item xs={8}>
                  <SearchBar searchUser={setUserSearch} bgColor="#404040" />
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    variant="h6"
                    color="#ffff"
                    fontWeight={"bold"}
                    style={{ margin: "40px", marginLeft: "10%" }}
                  ></Typography>{" "}
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
                <SearchBar />
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  style={{
                    borderRadius: "10px",
                    marginTop: "1rem",
                    background:
                      "linear-gradient(to right bottom, #C30772, #615EE0)",
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
                        LECTEURS
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
                  {folderObjects?.map((row) => (
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
                          {row.readers_names}
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
                                city: row.city,
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
              <AddFolder closeModal={handleClose} />
            </Modal>
            {/* <Modal
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
            </Modal> */}
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

export default Folders;
