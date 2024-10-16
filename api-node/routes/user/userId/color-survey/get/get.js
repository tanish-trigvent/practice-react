import { ColorSurvey, User } from "../../../../../models/index.js";

export default async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findOne({ _id: userId });
    if (user.role === "admin") {
      const colorCombinations = await ColorSurvey.find({}).populate("userId");
      res.send(colorCombinations);
    } else {
      res.status(403).send("Access denied");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
