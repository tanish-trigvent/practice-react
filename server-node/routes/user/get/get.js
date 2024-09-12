import { User } from "../../../models/index.js";

export default async function (req, res) {

    const users = await User.find();
    res.send(users)

}
