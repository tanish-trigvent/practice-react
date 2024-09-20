import mongoose from "mongoose";
import todoSchema from "./schema.js";

const todo = mongoose.model("todo", todoSchema);

export default todo;
