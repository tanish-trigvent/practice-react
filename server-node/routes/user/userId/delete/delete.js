import { User } from "../../../../models/index.js";

export default async function (req, res) {

    try {
        const { userId } = req;

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(400).send('User not found')
        }
        await User.findByIdAndDelete({ _id: userId })
        res.send('user deleted successfully')

    } catch (error) {
        res.send(error)
    }

}