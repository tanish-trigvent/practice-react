import { User } from "../../../models/index.js";

export default async function (req, res) {

    const { user } = req
    if (user?.role === 'admin') {
        const users = await User.find({ role: 'user' });
        return res.send(users)
    } else {
        res.status(403).send('Access denied')
    }


}
