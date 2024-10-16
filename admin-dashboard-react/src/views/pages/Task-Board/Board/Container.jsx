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
  backgroundColor: "whiteSmoke",
  padding: 8,
  margin: 5,
  width: "30vw",
};

export default function Container(props) {
  const { id, items } = props;

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
            sx={{ textTransform: "capitalize", color: "gray" }}
          >
            {id}
          </Typography>
        }
        ref={setNodeRef}
        style={containerStyle}
      >
        {items?.map((item) => (
          <SortableItem key={item?.id} item={item} />
        ))}
      </SubCard>
    </SortableContext>
  );
}
