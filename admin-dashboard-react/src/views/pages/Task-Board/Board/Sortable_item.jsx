import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Avatar,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconClock, IconPencil, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import SubCard from "ui-component/cards/SubCard";
import { useModal } from "components/Modal";
import useTodo from "hooks/todo/useTodo";
import { useSnackbar } from "components/Snackbar";
import TodoForm from "components/Todo/TodoForm";
import * as Yup from "yup";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export function Item({ item, attributes, listeners, updateTodo, refetchTodo }) {
  const imageUrl = `${apiUrl}/${item?.createdBy?.profilePhoto}`;
  const { showModal, closeModal } = useModal();
  const { isAddingTodo } = useTodo();
  const { showSnackbar } = useSnackbar();
  const style = {
    // alignItems: "center",
    // justifyContent: "center",
    margin: "4px 0",
    borderRadius: "10px",
    transition: "transform 0.3s ease-in-out",
    backgroundColor: "#343a40",
  };
  const borderColor =
    item?.status === "completed"
      ? "#69f0ae"
      : item?.status === "In-Progress"
        ? "primary.main"
        : item?.status === "overDue"
          ? "#ef9a9a"
          : "secondary";

  const hoverBorderColor =
    item?.status === "completed"
      ? "#00c853"
      : item?.status === "In-Progress"
        ? "#1565c0"
        : item?.status === "overDue"
          ? "#c62828"
          : "secondary";

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    status: Yup.string(),
    startTime: Yup.date()
      .required("Start time is required")
      .nullable()
      .test("isAfter", "You cannot select past dates", function (value) {
        const yesterday = dayjs().subtract(1, "day");
        return dayjs(value).isAfter(yesterday);
      }),
    endTime: Yup.date()
      .required("End time is required")
      .nullable()
      .test("isAfter", "End time must be after start time", function (value) {
        const { startTime } = this.parent;
        return dayjs(value).isAfter(dayjs(startTime));
      }),
    description: Yup.string().required("Description is required"),
  });

  //  function to submit todo after editing
  const submit = async (values) => {
    try {
      await updateTodo(values);
      showSnackbar("Todo updated successfully", "success");
      refetchTodo();
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

  return (
    <SubCard
      sx={{
        ...style,
        // borderColor: borderColor,
        "&:hover": { borderColor: hoverBorderColor },
      }}
      title={
        <>
          <Stack direction={"row"}>
            <Stack
              {...attributes}
              {...listeners}
              sx={{ cursor: "grab" }}
              width={190}
            ></Stack>
            <Stack direction={"row"}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditTodo(item);
                }}
              >
                <Tooltip title="Edit">
                  <IconPencil size={"16px"} />
                </Tooltip>
              </IconButton>
              <IconButton>
                <Tooltip title="delete">
                  <IconTrash size={"16px"} />
                </Tooltip>
              </IconButton>
            </Stack>
          </Stack>
        </>
      }
    >
      <Grid container sx={{ cursor: "grab" }} {...attributes} {...listeners}>
        <Grid sm={12} item>
          <Typography variant="h5" color={"white"}>
            {item?.title}
          </Typography>
        </Grid>
        <Grid sm={12} item>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <IconClock size={"16px"} color={"white"} />
              <Typography fontSize={"12px"} color={"white"}>
                {dayjs(item?.startTime).format("D MMM")}
              </Typography>
            </Stack>
            <Avatar sx={{ width: 30, height: 30 }} src={imageUrl} />
          </Stack>
        </Grid>
      </Grid>
    </SubCard>
  );
}

export default function SortableItem({ item, updateTodo, refetchTodo }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item?._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Stack ref={setNodeRef} style={style}>
      <Item
        item={item}
        attributes={attributes}
        listeners={listeners}
        updateTodo={updateTodo}
        refetchTodo={refetchTodo}
      />
    </Stack>
  );
}
