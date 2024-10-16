import React, { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Container from "./Container";
import { Item } from "./Sortable_item.jsx";
import { Stack } from "@mui/material";
import useTodo from "hooks/todo/useTodo";
import { useSelector } from "react-redux";

const defaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  },
};

export default function Board() {
  const userId = useSelector((state) => state?.userReducer?.user)._id;
  const { allTodo, updateTodo, refetchTodo } = useTodo(userId);
  const [todos, setTodos] = useState([{}]);
  const [updatedTodo, setUpdatedTodo] = useState({});
  const [items, setItems] = useState({
    todo: [],
    inProgress: [],
    overDue: [],
    completed: [],
  });
  const [activeId, setActiveId] = useState();

  useMemo(() => {
    setTodos(allTodo?.data);
  }, [allTodo]);

  useMemo(() => {
    const categorizedItems = {
      todo: [],
      inProgress: [],
      overDue: [],
      completed: [],
    };

    todos?.map((todo) => {
      if (todo.status === "In-Progress") {
        categorizedItems["inProgress"]?.push(todo);
      } else {
        categorizedItems[todo.status]?.push(todo);
      }
    });

    setItems(categorizedItems);
  }, [todos]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Stack
      direction={"row"}
      sx={{ overflow: "auto", width: "100vw", height: "90vh" }}
    >
      <DndContext
        announcements={defaultAnnouncements}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container id="todo" items={items.todo} />
        <Container id="In-Progress" items={items.inProgress} />
        <Container id="overDue" items={items.overDue} />
        <Container id="completed" items={items.completed} />
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </Stack>
  );

  // function findContainer(id) {
  //   if (id in items) {
  //     return id;
  //   }

  //   return Object.keys(items).find((key) => items[key].includes(id));
  // }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    const { id: todoId } = active;
    const { id: status } = over;
    let todoStatus = "";
    todos?.filter((todo) => {
      if (todo?._id === todoId && status.length < 12 && todoStatus === "") {
        const test = { ...todo, status: status };
        setUpdatedTodo(test);
      } else if (status === todo?._id) {
        todoStatus = todo?.status;
      }
    });

    if (todoStatus !== "") {
      todos?.filter((todo) => {
        if (todo?._id === todoId) {
          const test = { ...todo, status: todoStatus };
          setUpdatedTodo(test);
        }
      });
    }

    updateTodo(updatedTodo);
    refetchTodo();
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id: todoId } = active;
    const { id: status } = over;
    let todoStatus = "";
    todos?.filter((todo) => {
      if (todo?._id === todoId && status.length < 12 && todoStatus === "") {
        const test = { ...todo, status: status };
        setUpdatedTodo(test);
      } else if (status === todo?._id) {
        todoStatus = todo?.status;
      }
    });

    if (todoStatus !== "") {
      todos?.filter((todo) => {
        if (todo?._id === todoId) {
          const test = { ...todo, status: todoStatus };
          setUpdatedTodo(test);
        }
      });
    }

    updateTodo(updatedTodo);
    refetchTodo();
  }
}
