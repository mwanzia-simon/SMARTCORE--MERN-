/*
Update profile
Update profile Pic
*/

import User from "../../models/userModel.js";

// updateProfile function
export const updateProfile = async ({
  userID,
  firstName,
  lastName,
  phoneNumber,
}) => {
  if (!firstName || !lastName || !phoneNumber) {
    throw new Error("Missing fields!");
  }

  const user = await User.findById(userID);
  if (!user) {
    throw new Error("User does not exists!");
  }

  let formattedPhone = phoneNumber.trim().replace(/\s+/g, "");
  if (formattedPhone.startsWith("+254")) {
    formattedPhone = formattedPhone.replace("+", "");
  } else if (formattedPhone.startsWith("0")) {
    formattedPhone = `254${formattedPhone.substring(1)}`;
  }

  if (!/^254(7|1)\d{8}$/.test(formattedPhone)) {
    throw new Error("Please enter a valid phone number");
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.phoneNumber = phoneNumber;
  await user.save();
};
