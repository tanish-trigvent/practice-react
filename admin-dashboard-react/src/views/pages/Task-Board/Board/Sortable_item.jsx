import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { IconClock } from "@tabler/icons-react";
import dayjs from "dayjs";
import SubCard from "ui-component/cards/SubCard";
import { border, borderColor } from "@mui/system";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export function Item({ item }) {
  const imageUrl = `${apiUrl}/${item?.createdBy?.profilePhoto}`;
  const style = {
    // alignItems: "center",
    // justifyContent: "center",
    margin: "4px 0",
    width: "20vw",
    height: "13vh",
    borderRadius: "10px",
    transition: "transform 0.3s ease-in-out",
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

  return (
    <SubCard
      sx={{
        ...style,
        borderColor: borderColor,
        "&:hover": { borderColor: hoverBorderColor },
      }}
    >
      <Grid container>
        <Grid sm={12} item>
          <Typography variant="h5">{item?.title}</Typography>
        </Grid>
        <Grid sm={12} item>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <IconClock size={"16px"} color="gray" />
              <Typography fontSize={"12px"} color={"gray"}>
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

export default function SortableItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item?._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Stack ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item item={item} />
    </Stack>
  );
}
