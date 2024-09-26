import Router from "express-promise-router";
import post from "./post/post.js";
import get from "./get/get.js";

const router = Router();

router.post("/", post);
router.get("/", get);

export default router;
