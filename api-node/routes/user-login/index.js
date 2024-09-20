import Router from 'express-promise-router'
import post from './post/post.js'

const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: 'GET /user' })
})

router.post('/', post)


export default router