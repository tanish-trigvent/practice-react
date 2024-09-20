import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import dbConnect from "./db/connect.js";
import createAdmin from "./methods/createAdmin.js";
import cors from "cors";
import checkTodoStatus from "./methods/todo-cron.js";

const app = express();
dbConnect(); // db connection
createAdmin(); // create admin
checkTodoStatus(); // cron to check todo status

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen("5000", () => {
  console.log("Listening on port 5000");
});
