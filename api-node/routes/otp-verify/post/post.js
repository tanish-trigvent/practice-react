import { User } from "../../../models/index.js";
import genToken from "../../../models/user/methods/genToken.js";

export default async function (req, res) {

    const { body } = req;
    const { email, otp } = body


    const user = await User.findOne({ email })
    if (user) {
        if (user.otp === otp) {
            const token = await genToken(user?._id)
            await User.updateOne({ email }, {
                $set: {
                    otp: null,
                    // resetPasswordToken: token
                }
            })
            return res.send({ message: 'otp verified successfully', token: token })
        }
        res.status(409).send('Invalid OTP')

    }

    res.send('hello world')

}