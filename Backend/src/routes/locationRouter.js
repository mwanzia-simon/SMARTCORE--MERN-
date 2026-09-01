import express from "express";
import { getCities, getDeliveryFee, getRegions } from "../controllers/locationController.js";

const locationRouter = express.Router();

locationRouter.route("/regions").get(getRegions);
locationRouter.route("/cities/:region").get(getCities);
locationRouter.route("/delivery-fee").post(getDeliveryFee)

export default locationRouter;
