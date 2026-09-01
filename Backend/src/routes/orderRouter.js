import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import {
  changeStatus,
  deleteOrder,
  getAllOrders,
  getProductsRevenue,
  getUserOrders,
  placeOrderCOD,
  placeOrderOnline,
} from "../controllers/orderController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.route("/cod").post(userAuth, placeOrderCOD);
orderRouter.route("/payment").post(userAuth, placeOrderOnline);
orderRouter.route("/user").get(userAuth, getUserOrders);
orderRouter.route("/admin").get(adminAuth, getAllOrders);
orderRouter.route("/revenue").get(adminAuth, getProductsRevenue);
orderRouter.route("/status/:id").patch(adminAuth, changeStatus);
orderRouter.route("/delete/:id").delete(adminAuth, deleteOrder);

export default orderRouter;
