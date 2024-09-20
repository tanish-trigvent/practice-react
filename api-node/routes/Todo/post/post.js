import Joi from "joi";
import { todo } from "../../../models/index.js";

export default async (req, res) => {
  try {
    const validationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.string().optional(),
      endTime: Joi.date().required(),
      startTime: Joi.date().required(),
      createdBy: Joi.object().required(),
    });

    const { body, user } = req;
    const payload = {
      ...body,
      createdBy: user._id,
    };
    const result = await validationSchema.validateAsync(payload);
    const data = new todo(result);
    await data.save();

    return res.send("Todo successfully added");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
