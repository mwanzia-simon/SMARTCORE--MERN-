import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { mergeCart, updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.route("/update").post(userAuth, updateCart);
cartRouter.route("/merge-cart").post(userAuth, mergeCart);

export default cartRouter;
