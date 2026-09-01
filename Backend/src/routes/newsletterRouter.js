import express from "express"
import { subscribeToNewsletter } from "../controllers/newsletterController.js"
import { userAuth } from "../middleware/userAuth.js"

const newsletterRouter = express.Router()

newsletterRouter.route("/subscribe").post(userAuth,subscribeToNewsletter)

export default newsletterRouter