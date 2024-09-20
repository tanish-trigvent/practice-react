import Router from 'express-promise-router';
import auth from './auth.js';

const router = Router();

router.post('/', auth)

export default router;