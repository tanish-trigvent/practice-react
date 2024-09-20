import Router from "express-promise-router";
import user from "./user/index.js";
import userLogin from "./user-login/index.js";
import auth from "./auth/index.js";
import forgotPassword from "./forgot-password/index.js";
import sendOtp from "../methods/sendOtp.js";
import otpVerify from "./otp-verify/index.js";
import todo from "./Todo/index.js";

const router = Router();

router.use("/auth", auth);
router.use("/user", user);
router.use("/forgot-password", forgotPassword);
router.use("/otp-verify", otpVerify);
router.use("/todo", todo);

export default router;
