/*
Send reset OTP
Verify Reset OTP
Reset Password
Verify Account
send Verify Account link
Verify Reactivation
*/

import bcrypt from "bcryptjs";
import User from "../../models/userModel.js";
import generateToken from "../../config/generateToken.js";
import * as emailService from "../email/emailService.js";

// Register function
export const register = async (
  { firstName, lastName, email, phoneNumber, password },
  res,
) => {
  if (!firstName || !lastName || !phoneNumber || !email || !password) {
    throw new Error("All fields are required!");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("Email already exists!");
  }

  if (password.length < 6) {
    throw new Error("Password min length is 6 characters!");
  }

  let formattedPhone = phoneNumber.trim().replace(/\s+/g, "");

  if (formattedPhone.startsWith("+254")) {
    formattedPhone = formattedPhone.replace("+", "");
  } else if (formattedPhone.startsWith("0")) {
    formattedPhone = `254${formattedPhone.substring(1)}`;
  }

  if (!/^254(7|1)\d{8}$/.test(formattedPhone)) {
    throw new Error("Please enter a valid phone number!");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    phoneNumber,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  generateToken(res, newUser._id);

  await emailService.sendWelcomeEmail({
    user: newUser,
    url: process.env.CLIENT_URL,
  });

  return newUser;
};

// Login function
export const login = async ({ email, password }, res) => {
  if (!email || !password) {
    throw new Error("All fields are required!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials!");
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid password!");
  }

  generateToken(res, user._id);
  return user;
};

// sendPasswordResetOtp function
export const sendPasswordResetOtp = async ({ email }) => {
  if (!email) {
    throw new Error("Email is required!");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Account with this email does not exists!");
  }

  const otp = Math.floor(Math.random() * 900000 + 100000);
  user.resetOTP = otp;
  user.resetOTPExpiresIn = Date.now() * 15 * 60 * 1000;
  await user.save();

  await emailService.sendPasswordResetOtp(user, otp);
};

// verifyPasswordResetOtp function
export const verifyPasswordResetOtp = async ({ email, otp }) => {
  if (!email || !otp) {
    throw new Error("Invalid OTP!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Account with this email does not exists!");
  }

  if (user.resetOTPExpiresIn < Date.now()) {
    throw new Error("OTP Already Expired!");
  }

  if (user.resetOTP === "" || user.resetOTP !== otp) {
    throw new Error("Invalid OTP!");
  }
};

// resetPassword function
export const resetPassword = async ({ email, newPassword }) => {
  if (!email || !newPassword) {
    throw new Error("Email and new password required!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Account with this email does not exists!");
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  user.password = hashedPassword;
  user.resetOTP = "";
  user.resetOTPExpiresIn = 0;
  await user.save();

  await emailService.sendPasswordResetSuccesifully(user);
};

// sendVerifyAccountLink function
export const sendVerifyAccountLink = async ({ userID }) => {
  const user = await User.findById(userID);

  if (!user) {
    throw new Error("Account does not exists!");
  }

  const token = crypto.randomUUID();
  const link = `${process.env.CLIENT_URL}/verify-account/${token}`;
  user.verifyToken = token;
  user.verifyTokenExpiresIn = Date.now() * 15 * 60 * 1000;
  await user.save();

  await emailService.sendAccountVerificationLink(user, link);
};

// verifyAccount function
export const verifyAccount = async ({ userID, token }) => {
  if (!token) {
    throw new Error("No token provided!");
  }

  const user = await User.findById(userID);
  if (!user) {
    throw new Error("Account does not exists!");
  }

  if (user.verifyToken < Date.now()) {
    throw new Error("verification link already expired!");
  }

  if (user.verifyToken === "" || user.verifyToken !== token) {
    throw new Error("Invalid verification link");
  }

  user.isAccountVerified = true;
  user.verifyToken = "";
  user.verifyTokenExpiresIn = 0;
  await user.save();
};
