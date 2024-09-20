import { todo } from "../../../models/index.js";

export default async (req, res) => {
  try {
    const { user } = req;

    if (req?.user?.role == "admin") {
      const data = await todo.find();
      return res.send(data);
    }
    return res.status(403).send("Access denied");
  } catch (error) {
    res.status(403).send(error.message);
  }
};
