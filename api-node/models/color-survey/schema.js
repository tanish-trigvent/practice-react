import mongoose from "mongoose";

const colorSurveySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    colorCombination: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default colorSurveySchema;
