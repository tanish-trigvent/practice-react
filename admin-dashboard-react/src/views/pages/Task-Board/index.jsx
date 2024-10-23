import React from "react";
import SubCard from "ui-component/cards/SubCard";
import Board from "./Board/index.jsx";
import { Box, Typography } from "@mui/material";
import backgroundImage from "../../../assets/images/background.jpg";

const TaskBoard = () => {
  return (
    <SubCard
      title={
        <Typography color={"white"} variant="h3">
          Task Board
        </Typography>
      }
      sx={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Box sx={{ overflow: "auto" }}>
        <Board />
      </Box>
    </SubCard>
  );
};

export default TaskBoard;
