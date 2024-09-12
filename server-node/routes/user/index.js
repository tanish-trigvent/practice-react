import Router from 'express-promise-router'
import userId from './userId/index.js';
import post from './post/post.js';
import extractParam from '../../middlewares/extractParams.js';
import get from './get/get.js';
const router = Router()

router.use('/:userId', extractParam('userId'), userId)
router.post('/', post)
router.get('/', get)

export default router