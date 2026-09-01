import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { addAddress, getAddress } from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.route("/add").post(userAuth, addAddress);
addressRouter.route("/get").get(userAuth, getAddress);

export default addressRouter;
