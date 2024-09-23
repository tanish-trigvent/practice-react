import useAuth from "hooks/useAuth";
import { useMutation, useQuery } from "react-query";

const useTodo = (userId, search = "") => {
  const { request } = useAuth();
  console.log(userId);

  // Add todo
  const { mutateAsync: addTodo, isLoading: isAddingTodo } = useMutation(
    async (data) => {
      const response = await request.post("/todo", data);
      return response.data;
    },
    {
      onSuccess: () => {
        refetchTodo();
      },
    }
  );

  const {
    data: allTodo,
    isError,
    refetch: refetchTodo,
  } = useQuery(
    `['/todo']`,
    () => {
      return request.get("/todo", { params: { search } });
    },
    {
      enabled: !!userId,
    }
  );

  // update todo

  const {
    mutateAsync: updateTodo,
    isError: isTodoUpdationFailed,
    isLoading: isTodoUpdating,
  } = useMutation(
    async (updatedTodo) => {
      const response = await request.put(
        `/todo/${updatedTodo?._id}`,
        updatedTodo
      );
      return response.data;
    },
    {
      onSuccess: () => {
        refetchTodo();
      },
    }
  );

  // delete todo

  const { mutateAsync: deleteTodo, isLoading: isDeletingTodo } = useMutation(
    async (id) => {
      await request.delete(`/todo/${id}`);
    },
    {
      onSuccess: () => {
        refetchTodo();
      },
    }
  );

  return {
    addTodo,
    isAddingTodo,
    allTodo,
    isError,
    refetchTodo,
    updateTodo,
    isTodoUpdationFailed,
    isTodoUpdating,
    deleteTodo,
    isDeletingTodo,
  };
};

export default useTodo;
