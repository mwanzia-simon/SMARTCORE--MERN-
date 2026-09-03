import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phoneNumber: { type: String, required: true },
    profilePicture: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    password: { type: String, required: true },
    joined: { type: Date, default: Date.now },
    cartItems: { type: Object, default: {} },

    isAccountVerified: { type: Boolean, default: false },
    verifyToken: { type: String, default: "" },
    verifyTokenExpiresIn: { type: Number, default: 0 },

    resetOTP: { type: String, default: "" },
    resetOTPExpiresIn: { type: Number, default: 0 },

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    reactivationExpiresAt: { type: Date, default: null },
    activationToken: { type: String, default: "" },
    activationTokenExpiresIn: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["Active", "Suspended", "Deactivated"],
      default: "Active",
    },

    role: {
      type: String,
      enum: ["Customer", "Admin"],
      default: "Customer",
    },
  },
  { minimize: false, timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
