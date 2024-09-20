import Router from "express-promise-router";
import put from "./put/put.js";
import _delete from "./delete/delete.js";

const router = Router();

router.put("/", put);
router.delete("/", _delete);

export default router;
