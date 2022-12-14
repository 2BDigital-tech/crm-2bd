import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { folders } from "../../constants/folder_constants";
import FolderIcon from "@mui/icons-material/Folder";
import PdfIcon from "@mui/icons-material/PictureAsPdfRounded";
import uuid from "react-uuid";
import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";

import { useHttpClient } from "../../hooks/http-hook";

import { FileUpload } from "primereact/fileupload";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import { useEffect } from "react";

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

const FolderView = () => {
  const { state } = useLocation();
  const [files, setFiles] = useState([]);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/files/getDocuments/${state.folderId}`
        );
        console.log(response.docsList);
        setFiles(response.docsList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDocuments();
  }, []);

  const deleteDocument = async (folderId, subFolderId, docId) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/files/deleteDoc/${folderId}/${subFolderId}/${docId}`,
        "DELETE"
      );
      if (response) {
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onUpload = () => {
    window.location.reload(false);
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const chooseOptions = {
    label: "Selectionner des fichiers",
    icon: "pi pi-fw pi-plus",
  };
  const uploadOptions = {
    label: "Importer",
    icon: "pi pi-upload",
    className: "p-button-success",
  };
  const cancelOptions = {
    label: "Annuler",
    icon: "pi pi-times",
    className: "p-button-danger",
  };

  return (
    <div>
      <div style={styles.paperContainer}>
        <div style={styles.formContainer}>
          <Stack ml={{ xl: "290px", md: "290px" }} sx={{ mt: "-5%" }}>
            <Typography
              variant="h5"
              sx={{ mb: "7%" }}
              fontWeight={"bold"}
              color="#BBBBBB"
            >
              {state.folderName}
            </Typography>

            <div>
              {folders.map((folder, index) => {
                return (
                  <Accordion key={index} defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <FolderIcon />
                      <Typography>
                        {folder.id + "." + folder.subfolder}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FileUpload
                        chooseOptions={chooseOptions}
                        uploadOptions={uploadOptions}
                        cancelOptions={cancelOptions}
                        name="file"
                        url={`${process.env.REACT_APP_BACKEND_URL}/api/files/upload/${state.folderId}/${folder.id}`}
                        multiple
                        onUpload={onUpload}
                      ></FileUpload>

                      {files
                        .filter(
                          (fileObj) => fileObj.subFolderIndex == folder.id
                        )
                        .map((file) => {
                          return (
                            <>
                              <Typography
                                onClick={() => openInNewTab(file.fileUrl)}
                                key={uuid()}
                                sx={{
                                  "&:hover": {
                                    color: "black",
                                    cursor: "pointer",
                                  },
                                }}
                              >
                                <PdfIcon />
                                {" " + file.name}
                              </Typography>
                              <DeleteIcon
                                onClick={() =>
                                  deleteDocument(
                                    state.folderId,
                                    folder.id,
                                    file._id
                                  )
                                }
                                sx={{
                                  "&:hover": {
                                    color: "red",
                                    cursor: "pointer",
                                  },
                                }}
                              />
                            </>
                          );
                        })}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default FolderView;
