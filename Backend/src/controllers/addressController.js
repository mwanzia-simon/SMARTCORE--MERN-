// A function to add user addresses
// /api/address/add

import Address from "../models/addressModel.js";

export const addAddress = async (req, res) => {
  try {
    const userID = req.userID;
    const { address } = req.body;

    await Address.create({ ...address, userID });
    res.json({ success: true, message: "Address added succesifully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Function to get a list of all the address
// /api/address/get
export const getAddress = async (req, res) => {
  try {
    const userID = req.userID;

    const addresses = await Address.find({ userID });

    res.json({ success: true, addresses });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
