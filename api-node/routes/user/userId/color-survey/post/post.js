import { ColorSurvey } from "../../../../../models/index.js";

export default async (req, res) => {
  try {
    const { body, userId } = req;
    const survey = new ColorSurvey({
      userId,
      colorCombination: body,
    });
    await survey.save();
    res.send("survey submitted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
