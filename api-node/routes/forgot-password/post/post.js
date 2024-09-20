import sendOtp from "../../../methods/sendOtp.js";
import { User } from "../../../models/index.js";

export default async function (req, res) {

    try {

        const { body } = req;
        const { email } = body;

        const user = await User.findOne({ email: email });

        if (user) {
            // send Otp 
            const otp = sendOtp(email);
            await User.updateOne({ email: email }, {
                $set: {
                    otp: otp,
                }
            })
            res.send('Mail send Successful')
        } else {
            res.status(409).send('User not found')
        }

    } catch (error) {
        res.send(error)
    }


}