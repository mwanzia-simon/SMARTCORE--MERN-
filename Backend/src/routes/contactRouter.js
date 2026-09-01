import express from "express"
import { userAuth } from "../middleware/userAuth.js"
import { sendMessage } from "../controllers/contactController.js"

const contactRouter = express.Router()

contactRouter.route("/send").post(userAuth,sendMessage)


export default contactRouter