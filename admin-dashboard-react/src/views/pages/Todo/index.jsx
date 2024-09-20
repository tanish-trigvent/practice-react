import {
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DataGridTable from "components/DataGrid";
import { useModal } from "components/Modal";
import TodoForm from "components/Todo/TodoForm";
import useTodo from "hooks/todo/useTodo";
import { useSnackbar } from "components/Snackbar";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const Todo = () => {
  const userId = useSelector((state) => state?.userReducer?.user?._id);
  const { showModal, closeModal } = useModal();
  const { addTodo, isAddingTodo, allTodo, updateTodo, deleteTodo } =
    useTodo(userId);
  const { showSnackbar } = useSnackbar();
  const [todo, setTodo] = useState([]);

  useMemo(() => {
    setTodo(allTodo?.data);
  }, [allTodo]);

  // schema for validation
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    status: Yup.string(),
    startTime: Yup.date()
      .required("Start date is required")
      .nullable("Start time is required")
      .typeError("Invalid date format")
      .min(new Date(), "Start date must be in the future"),
    endTime: Yup.date().required("End Time is required"),
    description: Yup.string().required("Description is required"),
  });

  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 100,
    //   editable: false,
    // },
    {
      field: "title",
      headerName: "Task Title",
      width: 200,
      editable: false,
    },
    {
      field: "description",
      headerName: "Task Description",
      width: 200,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        let chipColor = "default";
        let textColor = "primary";
        switch (params.value) {
          case "completed":
            chipColor = "#69f0ae";
            textColor = "#00c853";
            break;
          case "In-progress":
            chipColor = "#90caf9";
            textColor = "#1565c0";
            break;
          case "overDue":
            chipColor = "#ef9a9a";
            textColor = "#c62828";
            break;
          default:
            chipColor = "#fff8e1";
            textColor = "#ffc107";
        }
        return (
          <Chip
            variant="filled"
            size="small"
            label={params.value}
            // color={chipColor}
            sx={{
              bgcolor: chipColor,
              color: textColor,
              borderColor: textColor,
            }}
          />
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      width: 200,
      getActions: (value) => {
        return [
          <GridActionsCellItem
            icon={
              <AnimateButton>
                <Tooltip title="edit">
                  <IconButton onClick={() => handleEditTodo(value.row)}>
                    <EditOutlinedIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </AnimateButton>
            }
            label="Edit"
            sx={{
              color: "lightgray",
            }}
          />,
          <GridActionsCellItem
            icon={
              <AnimateButton>
                <Tooltip title="delete">
                  <IconButton
                    onClick={() => handleOpenDeleteTodoModal(value?.row)}
                  >
                    <DeleteOutlineOutlinedIcon color="error" />
                  </IconButton>
                </Tooltip>
              </AnimateButton>
            }
            label="Delete"
            sx={{
              color: "lightgray",
            }}
          />,
        ];
      },
      renderHeader: () => <Typography>Action</Typography>,
    },
  ];

  const defaultValue = {
    title: "",
    description: "",
    status: "todo",
    startTime: "",
    endTime: "",
  };

  // function to submit todo form
  const handleTodoSubmit = async (values) => {
    try {
      await addTodo(values);
      showSnackbar("Todo added successfully", "success");
      closeModal();
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  };

  // function to open add todo modal
  const handleAddTodo = () => {
    showModal({
      title: "Add Todo",
      confirmText: "Save",
      onSubmit: handleTodoSubmit,
      content: <TodoForm disabled={"true"} />,
      isLoading: isAddingTodo,
      defaultValue,
      validation: validationSchema,
    });
  };

  //  function to submit todo after editing
  const submit = async (values) => {
    try {
      await updateTodo(values);
      showSnackbar("Todo updated successfully", "success");
      closeModal();
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  };

  // function to edit todo
  const handleEditTodo = (selectedTodo) => {
    showModal({
      title: "Edit Todo",
      confirmText: "Save",
      onSubmit: submit,
      content: <TodoForm disabled="false" />,
      isLoading: isAddingTodo,
      defaultValue: selectedTodo,
      validation: validationSchema,
    });
  };

  const handleOpenDeleteTodoModal = (defaultValue) => {
    showModal({
      title: "Delete Todo",
      confirmText: "Delete",
      onSubmit: handleDeleteTodo,
      defaultValue,
      content: (
        <Typography>Are you sure you want to delete this user?</Typography>
      ),
    });
  };

  const handleDeleteTodo = async (selectedTodo) => {
    try {
      await deleteTodo(selectedTodo._id);
      showSnackbar("Todo deleted successfully", "success");
      closeModal();
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  };

  return (
    <SubCard
      title={
        <Stack
          justifyContent={"space-between"}
          direction={"row"}
          alignItems={"center"}
        >
          <Typography variant="h3">To-do</Typography>
          <AnimateButton>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddTodo}
            >
              Add Todo +
            </Button>
          </AnimateButton>
        </Stack>
      }
    >
      <DataGridTable columns={columns} rows={todo} getR />
    </SubCard>
  );
};

export default Todo;
