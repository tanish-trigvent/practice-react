import { todo } from "../../../models/index.js";

export default async (req, res) => {
  try {
    const { user, query } = req;

    if (user?.role == "admin") {
      const data = await todo.find({
        $or: [
          { title: { $regex: query.search, $options: "i" } },
          { description: { $regex: query.search, $options: "i" } },
        ],
      });
      return res.send(data);
    } else {
      const data = await todo.find({
        createdBy: user?._id,
        $or: [
          { title: { $regex: query.search, $options: "i" } },
          { description: { $regex: query.search, $options: "i" } },
        ],
      });
      return res.send(data);
    }
  } catch (error) {
    res.status(403).send(error.message);
  }
};
