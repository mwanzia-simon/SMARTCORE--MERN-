import express from "express";
import {
  addProduct,
  changeStock,
  deleteProduct,
  productById,
  productList,
} from "../controllers/productController.js";
// import { upload } from "../config/multer.js";
import { adminAuth } from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter;
//   .route("/add")
//   .post(upload.array(["images"]), adminAuth, addProduct);
productRouter.route("/list").get(productList);
productRouter.route("/id").get(productById);
productRouter.route("/stock/:id").post(adminAuth, changeStock);
productRouter.route("/delete/:id").delete(adminAuth, deleteProduct);

export default productRouter;
