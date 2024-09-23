import Router from "express-promise-router";
import put from "./put/put.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname("./", __filename);
    cb(null, __dirname + "/images"); // Folder to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Customize filename
  },
});

const upload = multer({ storage });

router.put("/", upload.single("file"), put);

export default router;
