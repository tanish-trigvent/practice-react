import Joi from "joi"
import { User } from '../../../models/index.js'


export default async (req, res) => {

    try {
        const { body } = req
        const schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        })


        const value = await schema.validateAsync(body)
        const data = await new User(value).save()
        res.send(data)

    } catch (error) {
        res.send(error)
    }

}