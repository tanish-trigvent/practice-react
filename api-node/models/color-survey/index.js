import mongoose from "mongoose";
import colorSurveySchema from "./schema.js";

const ColorSurvey = mongoose.model("colorSurvey", colorSurveySchema);

export default ColorSurvey;
