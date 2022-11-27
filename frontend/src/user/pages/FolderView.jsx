import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { folders } from "../../constants/folder_constants";
import FolderIcon from "@mui/icons-material/Folder";
import { FileUploader } from "react-drag-drop-files";
import PdfIcon from "@mui/icons-material/PictureAsPdfRounded";
import uuid from "react-uuid";

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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const onSelect = (event, folderId) => {
  //   for (var i = 0; i < event.files.length; i++) {
  //     var fileObj = {
  //       folderId: folderId,
  //       name: event.files[i].name,
  //     };
  //     setFiles([...files, fileObj]);
  //   }
  // };

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
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <FolderIcon />
                      <Typography>
                        {folder.id + "." + folder.subfolder}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <FileUploader 
                       allowMultipleFiles
                       handleChange={uploadFile}
                       label="Cliquez / Déposez ici pour importer des documents"
                       hoverTitle="Déposez les fichiers ici"
                    /> */}
                      <FileUpload
                        chooseOptions={chooseOptions}
                        uploadOptions={uploadOptions}
                        cancelOptions={cancelOptions}
                        name="file"
                        url={`${
                          process.env.REACT_APP_BACKEND_URL
                        }/api/files/upload/${state.folderId}/${
                          folder.id
                        }/${uuid()}`}
                        multiple
                        onUpload={onUpload}
                      ></FileUpload>

                      {files
                        .filter(
                          (fileObj) => fileObj.subFolderIndex == folder.id
                        )
                        .map((file) => {
                          return (
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
