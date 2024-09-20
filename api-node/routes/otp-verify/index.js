import Router from 'express-promise-router'
import post from './post/post.js'
const router = Router();

router.post('/', post)

export default router;