import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Avatar,
  AvatarGroup,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
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
    margin: "8px 0",
    // borderRadius: 10,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    backgroundColor: "#ffffff",
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

  const statusAccentColor =
    item?.status === "completed"
      ? "#22c55e"
      : item?.status === "In-Progress"
        ? "#3b82f6"
        : item?.status === "overDue"
          ? "#ef4444"
          : "#94a3b8";

  const assignees =
    Array.isArray(item?.assignees) && item?.assignees.length > 0
      ? item?.assignees
      : [item?.createdBy].filter(Boolean);

  const displayKey =
    item?.code || `NUC-${(item?._id || "").slice(-3) || "205"}`;
  const estimateCount = item?.estimate || item?.storyPoints || 9;

  return (
    <SubCard
      sx={{
        ...style,
        border: "1px solid #e6e9ef",
        boxShadow: "0 1px 3px rgba(16,24,40,0.08)",
        borderLeft: `4px solid ${statusAccentColor}`,
        "&:hover": {
          boxShadow: "0 4px 10px rgba(16,24,40,0.12)",
          borderColor: "#d6dbe5",
        },
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
          <Typography variant="subtitle1" color={"#0f172a"} fontWeight={600}>
            {item?.title}
          </Typography>
        </Grid>
        <Grid sm={12} item>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Chip
                size="small"
                icon={
                  <AssignmentTurnedInOutlinedIcon sx={{ color: "#1e8e3e" }} />
                }
                label={displayKey}
                sx={{
                  height: 24,
                  bgcolor: "#e7f5ec",
                  color: "#166534",
                  borderRadius: 1,
                  "& .MuiChip-label": { px: 1 },
                }}
              />
              <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    bgcolor: "#eef2f7",
                    color: "#475569",
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #e6e9ef",
                  }}
                >
                  {estimateCount}
                </Box>
                <KeyboardArrowDownRoundedIcon
                  sx={{ color: "#64748b" }}
                  fontSize="small"
                />
              </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={0.5}
                sx={{ pr: 0.5 }}
              >
                <IconClock size={"16px"} color={"#64748b"} />
                <Typography fontSize={"12px"} color={"#64748b"}>
                  {dayjs(item?.startTime).format("D MMM")}
                </Typography>
              </Stack>
              <AvatarGroup
                max={3}
                sx={{
                  "& .MuiAvatar-root": { width: 26, height: 26, fontSize: 12 },
                }}
              >
                {assignees?.slice(0, 3)?.map((user, idx) => (
                  <Avatar
                    key={user?._id || idx}
                    src={`${apiUrl}/${user?.profilePhoto}`}
                  />
                ))}
              </AvatarGroup>
            </Stack>
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
