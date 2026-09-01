 import express from "express"
import { adminLogin, adminLogout, isAdminAuth } from "../controllers/adminController.js"
import { adminAuth } from "../middleware/adminAuth.js"

 const adminRouter = express.Router()

 adminRouter.route("/login").post(adminLogin)
 adminRouter.route("/logout").post(adminLogout)
 adminRouter.route("/isAuth").get(adminAuth,isAdminAuth)


 export default adminRouter