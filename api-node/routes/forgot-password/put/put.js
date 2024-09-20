import verifyToken from "../../../methods/verifyToken.js"

export default async (req, res) => {

    const { body } = req
    const { token, password } = body

    const user = await verifyToken(token)
    // console.log(user)
    user.password = password
    await user.save();

    res.status(200).json({ message: 'password changed successfull' })
}