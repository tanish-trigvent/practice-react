import Router from "express-promise-router";
import put from "./put/put.js";

const router = Router();

router.put("/", put);

export default router;
