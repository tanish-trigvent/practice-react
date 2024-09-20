import cron from "node-cron";
import { todo } from "../models/index.js";

const checkTodoStatus = () => {
  // Schedule a task to run every minute
  cron.schedule("* * * * * ", async () => {
    const date = new Date();
    const allTodo = await todo.find();

    allTodo?.map(async (todo) => {
      if (
        todo?.endTime < date &&
        todo.status !== "overDue" &&
        todo.status !== "completed"
      ) {
        todo.status = "overDue";
        await todo.save();
      }
    });

    // Add your code to perform the desired task here
    // e.g., run a function, check a service, etc.
  });
};

export default checkTodoStatus;
