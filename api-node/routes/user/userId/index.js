import Router from "express-promise-router";
import _delete from "./delete/delete.js";
import update from "./put/put.js";
import changePassword from "./changePassword/index.js";
import get from "./get/get.js";
import changeProfilePhoto from "./changeProfilePhoto/index.js";
import colorSurvey from "./color-survey/index.js";

const router = Router();
router.delete("/", _delete);
router.put("/", update);
router.get("/", get);
router.use("/color-survey", colorSurvey);
router.use("/changePassword", changePassword);
router.use("/changeProfilePhoto", changeProfilePhoto);

export default router;
