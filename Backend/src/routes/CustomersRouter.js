import express from "express";
import {
  changeAccountRole,
  changeAccountStatus,
  deleteCustomer,
  getCustomerData,
  getCustomers,
  resendPasswordResetOtp,
  resendVerificationEmail,
  suspendCustomerAccount,
} from "../controllers/customersController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const customersRouter = express.Router();

customersRouter.route("/").get(adminAuth, getCustomers);
customersRouter.route("/delete/:id").delete(adminAuth, deleteCustomer);
customersRouter.route("/:id").get(adminAuth, getCustomerData);
customersRouter.route("/role/:id").post(adminAuth, changeAccountRole);
customersRouter.route("/status/:id").post(adminAuth, changeAccountStatus);
customersRouter
  .route("/resend-verification-email")
  .post(adminAuth, resendVerificationEmail);
customersRouter
  .route("/resend-password-reset-otp")
  .post(adminAuth, resendPasswordResetOtp);
customersRouter
  .route("/suspend-account")
  .post(adminAuth, suspendCustomerAccount);

export default customersRouter;
