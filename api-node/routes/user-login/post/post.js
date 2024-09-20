export default (req, res) => {

    const { body } = req;

    res.status(200).json({ message: 'user' })
}