import React from "react";
import SubCard from "ui-component/cards/SubCard";
import Board from "./Board/index.jsx";
import {
  Box,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import backgroundImage from "../../../assets/images/background.jpg";

const TaskBoard = () => {
  return (
    <SubCard
      title={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography color={"#0f172a"} variant="h4" fontWeight={700}>
            Board
          </Typography>

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              size="small"
              placeholder="Search tasks..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#64748b" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                minWidth: { xs: "100%", sm: 260 },
                "& .MuiOutlinedInput-root": {
                  color: "#0f172a",
                  backgroundColor: "#ffffff",
                  borderRadius: 2,
                  "& fieldset": { borderColor: "#e6e9ef" },
                  "&:hover fieldset": { borderColor: "#cfd6e4" },
                  "&.Mui-focused fieldset": { borderColor: "#94a3b8" },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#94a3b8",
                },
              }}
            />
            <Button
              size="small"
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{
                color: "#0f172a",
                borderColor: "#e6e9ef",
                "&:hover": {
                  borderColor: "#cfd6e4",
                  backgroundColor: "#f6f8fb",
                },
              }}
            >
              Filter
            </Button>
            <Button
              size="small"
              variant="contained"
              startIcon={<AddRoundedIcon />}
              sx={{
                bgcolor: "#1d4ed8",
                color: "#ffffff",
                textTransform: "none",
                boxShadow: "0 1px 2px rgba(16,24,40,0.06)",
                "&:hover": { bgcolor: "#1e40af" },
              }}
            >
              Add Task
            </Button>
          </Stack>
        </Box>
      }
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: 2,
        boxShadow: 2,
        border: "1px solid #e6e9ef",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Chip
          label="To Do"
          size="small"
          sx={{ bgcolor: "#e9eef6", color: "#44546f", fontWeight: 600 }}
        />
        <Chip
          label="In Progress"
          size="small"
          sx={{ bgcolor: "#e9eef6", color: "#44546f", fontWeight: 600 }}
        />
        <Chip
          label="In QA"
          size="small"
          sx={{ bgcolor: "#e9eef6", color: "#44546f", fontWeight: 600 }}
        />
        <Chip
          label="Done"
          size="small"
          sx={{ bgcolor: "#e9eef6", color: "#44546f", fontWeight: 600 }}
        />
      </Box>

      <Box
        sx={{
          overflow: "auto",
          p: { xs: 1.5, md: 2 },
          borderRadius: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <Board />
      </Box>
    </SubCard>
  );
};

export default TaskBoard;
