import express from "express";
import {
  login,
  logout,
  register,
  activateAccount,
  changePassword,
  deleteAccount,
  resetPassword,
  sendPasswordResetOtp,
  sendVerifyAccountLink,
  verifyAccount,
  verifyPasswordResetOtp,
  verifyReactivation,
} from "../controllers/authController.js";
import { userAuth } from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);


authRouter.route("/send-reset-otp").post(sendPasswordResetOtp);
authRouter.route("/verify-reset-otp").post(verifyPasswordResetOtp);
authRouter.route("/verify-account-link").post(userAuth, sendVerifyAccountLink);
authRouter.route("/verify-account").post(userAuth, verifyAccount);
authRouter.route("/reset-password").post(resetPassword);
authRouter.route("/change-password").post(userAuth, changePassword);
authRouter.route("/delete-account").post(userAuth, deleteAccount);
authRouter.route("/activate-account").post(userAuth, activateAccount);
authRouter.route("/verify-reactivation").post(userAuth, verifyReactivation);

export default authRouter;
