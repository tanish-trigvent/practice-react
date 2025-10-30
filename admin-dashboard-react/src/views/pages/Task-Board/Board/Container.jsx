import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./Sortable_item.jsx";
import SubCard from "ui-component/cards/SubCard.jsx";
import { Typography, Stack, Chip } from "@mui/material";

const containerStyle = {
  backgroundColor: "#f6f8fb",
  padding: 12,
  margin: 8,
  width: "340px",
  minWidth: "385px",
  height: "auto",
  borderRadius: 12,
};

export default function Container(props) {
  const { id, items, updateTodo, refetchTodo } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <SubCard
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="h5"
              sx={{
                textTransform: "uppercase",
                color: "#44546f",
                fontWeight: 700,
                letterSpacing: 0.4,
              }}
            >
              {id === "In-Progress" ? "IN PROGRESS" : id.toUpperCase()}
            </Typography>
            <Chip
              size="small"
              label={items?.length || 0}
              sx={{ bgcolor: "#e9eef6", color: "#44546f", fontWeight: 600 }}
            />
          </Stack>
        }
        ref={setNodeRef}
        style={containerStyle}
        sx={{
          backgroundColor: "#f6f8fb",
          border: "1px solid #e6e9ef",
          boxShadow: "0 1px 2px rgba(16,24,40,0.06)",
        }}
      >
        {items?.map((item) => (
          <SortableItem
            key={item?._id}
            item={item}
            updateTodo={updateTodo}
            refetchTodo={refetchTodo}
          />
        ))}
      </SubCard>
    </SortableContext>
  );
}
