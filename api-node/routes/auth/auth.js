import bcrypt from "bcrypt";
import { User } from "../../models/index.js";

export default async (req, res) => {

    const { body } = req;
    const { email, password } = body
    try {
        const loginCred = new User({
            email,
            password
        });
        const result = await User.findOne({ email: loginCred.email });
        if (!result) {
            return res.status(409).send({ message: 'User not found' });
        }
        const compare = await bcrypt.compare(loginCred?.password, result.password);
        if (compare) {
            const token = await loginCred.genToken(result._id);
            res.send({ token: token, data: result });
        } else {
            res.status(409).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.send(error)
    }
};