import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
  region: {
    type: String,
    required: true,
  },
  city: {
    type: Array,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  deliveryFee: {
    type: Number,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("Location", locationSchema);
export default Location;
