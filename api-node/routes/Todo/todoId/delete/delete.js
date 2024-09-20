import { todo } from "../../../../models/index.js";

export default async function (req, res) {
  try {
    const { todoId } = req;

    const isTodo = await todo.findOne({ _id: todoId });
    if (!isTodo) {
      return res.status(400).send("todo not found");
    }
    await todo.findByIdAndDelete({ _id: todoId });
    res.send("Todo deleted successfully");
  } catch (error) {
    res.status(409).send(error.message);
  }
}
