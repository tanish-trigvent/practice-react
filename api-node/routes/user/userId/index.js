import Router from 'express-promise-router'
import _delete from './delete/delete.js'
import update from './put/put.js'


const router = Router()
router.delete('/', _delete)
router.put('/', update)

export default router