// This returns the user data  if the user is signed in
import { cloudinary } from "../config/cloudinary.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import * as userService from "../services/user/userService.js";

// getData function
export const getData = async (req, res) => {
  try {
    const userID = req.userID;
    const user = await User.findById(userID);
    return res.json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        cartItems: user.cartItems,
        profilePicture: user.profilePicture,
        joined: user.joined,
        phoneNumber: user.phoneNumber,
        isAccountVerified: user.isAccountVerified,
        isDeleted: user.isDeleted,
        deletedAt: user.deletedAt,
        reactivationExpiresAt: user.reactivationExpiresAt,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// updateProfilePic function
export const updateProfilePic = async (req, res) => {
  try {
    const { userID } = req;
    const { profilePic } = req.body;
    if (!profilePic)
      return res.json({
        success: false,
        message: "No profile picture provided!",
      });

    const user = await User.findById(userID);

    if (!user)
      return res.json({ success: false, message: "Account does not exist!" });

    // Uploading the profile pic to cloudinary
    const result = await cloudinary.uploader.upload(profilePic, {
      folder: "smartcore/profile-pictures",
      resource_type: "image",
    });

    // Deleting any existing profile pics
    if (user.profilePicture?.public_id) {
      await cloudinary.uploader.destroy(user.profilePicture.public_id);
    }

    user.profilePicture.url = result.secure_url;
    user.profilePicture.public_id = result.public_id;

    await user.save();

    return res.json({
      success: true,
      message: "Profile updated succesifully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// updateProfile function
export const updateProfile = async (req, res) => {
  try {
    const { userID } = req;
    const { firstName, lastName, phoneNumber } = req.body;
    await userService.updateProfile({
      userID,
      firstName,
      lastName,
      phoneNumber,
    });
    return res.json({ success: true, message: "Updated succesifully!" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
