import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./Sortable_item.jsx";
import SubCard from "ui-component/cards/SubCard.jsx";
import { Typography } from "@mui/material";

const containerStyle = {
  backgroundColor: "#212529",
  padding: 8,
  margin: 5,
  width: "350px",
  height: "auto",
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
          <Typography
            variant="h4"
            sx={{ textTransform: "capitalize", color: "white" }}
          >
            {id}
          </Typography>
        }
        ref={setNodeRef}
        style={containerStyle}
      >
        {items?.map((item) => (
          <SortableItem
            key={item?.id}
            item={item}
            updateTodo={updateTodo}
            refetchTodo={refetchTodo}
          />
        ))}
      </SubCard>
    </SortableContext>
  );
}
