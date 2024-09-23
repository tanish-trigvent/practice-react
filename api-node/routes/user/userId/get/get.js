import { User } from "../../../../models/index.js";

export default async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
