import { User } from "../../../../../models/index.js";

export default async (req, res) => {
  const { file, userId } = req;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      await User.findByIdAndUpdate(user._id, {
        profilePhoto: file.path,
      });
      const userDetails = await User.findById(userId);
      res.send({ message: "Profile Image uploaded successfully", userDetails });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
