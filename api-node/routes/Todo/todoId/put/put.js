import { todo } from "../../../../models/index.js";

export default async function (req, res) {
  const { body, todoId } = req;
  try {
    await todo.findByIdAndUpdate({ _id: todoId }, body, {
      new: true,
    });
    res.send("Todo updated successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}
