import { Grid } from "@mui/material";
import BasicAutocomplete from "components/AutoComplete";
import MuiTextField from "components/input/MuiTextField";
import React from "react";

const TodoForm = ({ disabled = "false" }) => {
  const taskStatus = [
    {
      id: 1,
      label: "todo",
      value: "todo",
    },
    {
      id: 2,
      label: "In-Progress",
      value: "In-progress",
    },
    {
      id: 3,
      label: "completed",
      value: "completed",
    },
    {
      id: 4,
      label: "overDue",
      value: "overdue",
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MuiTextField
          label="Task Title"
          name="title"
          required
          size="small"
          fullWidth
          fontSize="small"
        />
      </Grid>
      <Grid item xs={12}>
        <BasicAutocomplete
          name={"status"}
          label={"Task Status"}
          size={"small"}
          options={taskStatus}
          disabled={disabled === "true" ? true : false}
        />
      </Grid>
      <Grid item xs={5.5}>
        <MuiTextField
          label={"Start Time"}
          name="startTime"
          type="datetime-local"
          size={"small"}
        />
      </Grid>
      <Grid item xs={5.5}>
        <MuiTextField
          label={"End Time"}
          name="endTime"
          type="datetime-local"
          size={"small"}
        />
      </Grid>
      <Grid item xs={12}>
        <MuiTextField
          label="Task Desription"
          name="description"
          required
          multiline
          minRows={4}
          maxRows={4}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default TodoForm;
