import { User } from "../../../../models/index.js";

export default async function (req, res) {

    const { body, userId } = req;
    try {
        const user = await User.findByIdAndUpdate(userId, body, { new: true });
        res.send('user updated successfully');
    } catch (error) {
        res.status(500).send(error);
    }

}