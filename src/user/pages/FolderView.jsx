import React from "react";
import { useLocation } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { folders } from "../../constants/folder_constants";

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
                  <Accordion key={index} style={{ backgroundColor: "#ADB1B5" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>
                        {folder.id + "." + folder.subfolder}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
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
