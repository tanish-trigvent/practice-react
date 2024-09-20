import Router from 'express-promise-router'
import userId from './userId/index.js';
import post from './post/post.js';
import extractParam from '../../middlewares/extractParams.js';
import get from './get/get.js';
import auth from '../../middlewares/auth.js'

const router = Router()

router.use('/:userId', extractParam('userId'), userId)
router.post('/', post)
router.get('/', auth, get)

export default router