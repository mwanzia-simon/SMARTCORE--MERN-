import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRouter.js";
import adminRouter from "./routes/adminRouter.js";
import orderRouter from "./routes/orderRouter.js";
import productRouter from "./routes/productRouter.js";
import addressRouter from "./routes/addressRouter.js";
import contactRouter from "./routes/contactRouter.js";
import locationRouter from "./routes/locationRouter.js";
import customersRouter from "./routes/CustomersRouter.js";
import newsletterRouter from "./routes/newsletterRouter.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const PORT = process.env.PORT || 5700;

const allowedOrigins = ["https://smartcorecomputers.onrender.com"];
app.use(express.json({ limit: "5mb" }));
app.use(cors({ credentials: true, origin: allowedOrigins }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/contact", contactRouter);
app.use("/api/location", locationRouter);
app.use("/api/customers", customersRouter);
app.use("/api/newsletter", newsletterRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/", "dist", "index.html"));
});

connectDB().then(() => {
  connectCloudinary()
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
