import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    role: {
      type: "string",
      default: "user",
    },
    otp: {
      type: "string",
      default: "",
    },
    profilePhoto: {
      type: "string",
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
