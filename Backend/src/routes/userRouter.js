import express from "express";
import {
  getData,
  updateProfile,
  updateProfilePic,
} from "../controllers/userController.js";
import { userAuth } from "../middleware/userAuth.js";

const userRouter = express.Router();

userRouter.route("/data").get(userAuth, getData);
userRouter.route("/update-profile-picture").post(userAuth, updateProfilePic);
userRouter.route("/update-profile").post(userAuth, updateProfile);

export default userRouter;
