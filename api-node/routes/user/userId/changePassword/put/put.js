import { User } from "../../../../../models/index.js";
import bcrypt from "bcrypt";

export default async (req, res) => {
  try {
    const { body, userId } = req;
    const { currentPassword, newPassword } = body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(currentPassword, user?.password);
      console.log(isMatch, currentPassword);
      if (!isMatch) {
        return res.status(400).send("Invalid current password");
      }
      const changedPassword = await bcrypt.hash(newPassword, 10);
      await User.updateOne(
        { _id: userId },
        { $set: { password: changedPassword } }
      );
      return res.status(200).json({ message: "password changed successfully" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};
