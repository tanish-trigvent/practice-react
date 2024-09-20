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
        const isUserAlreadyRegisterd = await User?.findOne({ email: value?.email })
        if (isUserAlreadyRegisterd) {
            return res.status(409).send('User Already Registerd');
        }
        await new User(value).save()
        return res.send({ message: 'User registered successfully' })
    } catch (error) {
        res.status(401).send(error?.message)
    }

}