import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    region: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
  },
  { timestamps: true },
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
