import Router from "express-promise-router";
import post from "./post/post.js";
import auth from "../../middlewares/auth.js";
import get from "./get/get.js";
import extractParam from "../../middlewares/extractParams.js";
import todoId from "./todoId/index.js";
const router = Router();

router.use("/:todoId", extractParam("todoId"), todoId);
router.post("/", auth, post);
router.get("/", auth, get);

export default router;
