/*
Change password
Delete account
Activate Account
*/

import bcrypt from "bcryptjs";
import * as emailService from "../email/emailService.js";
import User from "../../models/userModel.js";

// changePassword function
export const changePassword = async ({
  userID,
  currentPassword,
  newPassword,
  confirmPassword,
}) => {
  const user = await User.findById(userID);

  if (!user) {
    throw new Error("User account does not exists!");
  }

  const passwordMatch = bcrypt.compareSync(currentPassword, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid current password!");
  }

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error("All fields are required!");
  }

  if (newPassword.trim() !== confirmPassword.trim()) {
    throw new Error("Passwords do not match!");
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  user.password = hashedPassword;

  await user.save();
};

// deleteAccount function
export const deleteAccount = async ({ userID, securityPassword }) => {
  const user = await User.findById(userID);

  if (!user) {
    throw new Error("Account does not exists!");
  }

  const passwordMatch = bcrypt.compareSync(securityPassword, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid password!");
  }

  user.isDeleted = true;
  user.status = "Deactivated";
  user.deletedAt = Date.now();
  user.reactivationExpiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;

  await user.save();
};

// activateAccount
export const activateAccount = async ({ userID }) => {
  const user = await User.findById(userID);
  if (!user) {
    throw new Error("Account does not exists!");
  }

  const token = crypto.randomUUID();
  const link = `${process.env.CLIENT_URL}/activate-account/${token}`;
  user.activationToken = token;
  user.activationTokenExpiresIn = Date.now() * 15 * 60 * 1000;
  await user.save();

  await emailService.sendAccountReactivationLink(user, link);
};

// verifyReactivation function
export const verifyReactivation = async ({ userID, token }) => {
  const user = await User.findById(userID);
  if (!user) {
    throw new Error("Account does not exists!");
  }

  if (user.activationTokenExpiresIn < Date.now()) {
    throw new Error("Reactivation link expired!");
  }

  if (user.activationToken == "" || user.activationToken !== token) {
    throw new Error("Invalid or expired reactivation link!");
  }

  user.isDeleted = false;
  user.status = "Active";
  user.deletedAt = null;
  user.reactivationExpiresAt = null;
  user.activationToken = "";
  user.activationTokenExpiresIn = null;
  await user.save();
};

// suspendCustomerAccount function
export const suspendCustomerAccount = async ({ id }) => {
  if (!id) {
    throw new Error("Customer id not provided!");
  }
  const user = await User.findById(id);
  if (!user) {
    throw new Error("Account does not exists!");
  }

  if (user.status == "Suspended") {
    throw new Error("Account already suspended!");
  }

  user.status = "Suspended";
  await user.save();
};
