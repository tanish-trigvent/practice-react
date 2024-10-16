import React from "react";
import SubCard from "ui-component/cards/SubCard";
import Board from "./Board/index.jsx";
import { Box } from "@mui/material";

const TaskBoard = () => {
  return (
    <SubCard title={"Task Board"}>
      <Box sx={{ overflow: "auto" }}>
        <Board />
      </Box>
    </SubCard>
  );
};

export default TaskBoard;
