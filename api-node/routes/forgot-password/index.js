import Router from "express-promise-router";
import post from "./post/post.js";
import put from "./put/put.js";

const router = Router();

router.post('/', post)
router.put('/', put)

export default router;