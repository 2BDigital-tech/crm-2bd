import React from "react";
import { Card } from "@mui/material";

const HeaderCard = (props) => {
  return (
    <>
      <Card
        sx={{
          border: 3,
          borderColor: "#202020",
          boxShadow: 3,
          width: "70%",
          position: "relative",
          marginLeft: "300px",
          marginRight: "100%",
          marginTop: "40px",
          borderRadius: "10px",
          fontSize: "35px",
          backgroundColor: "#2d2d2d",
          color: "white",
          textIndent: "15px",
        }}
      >
        {props.title}
      </Card>

      {/* <Footer /> */}
    </>
  );
};

export default HeaderCard;
