// This is to update the cart data

import User from "../models/userModel.js";

export const updateCart = async (req, res) => {
  try {
    const { userID } = req;

    const { cartItems } = req.body;

    await User.findByIdAndUpdate(userID, { cartItems });

    res.json({ success: true, message: "Cart updated succesifully!" });
  } catch (error) {
    return res.json({ success: true, message: error.message });
  }
};

// function to merge the cart items if the guest user visits the websit or if a registered user is not logged in and add products to the cart

export const mergeCart = async (req, res) => {
  try {
    const { userID } = req;
    const { cartItems } = req.body;
    // Getting the user from the db

    const user = await User.findById(userID);

    // Checking if the user exists
    if (!user)
      return res.json({ success: false, message: "Account does not exists!" });

    // Merging the two carts
    for (const item in cartItems) {
      if (user.cartItems[item]) {
        user.cartItems[item] += cartItems[item];
      } else {
        user.cartItems[item] = cartItems[item];
      }
    }


    // Saving the cart items 
    user.markModified("cartItems")
    await user.save()
    return res.json({ success: true, message: "Cart merged succesifully!" });
  } catch (error) {
    return res.json({ success: true, message: error.message });
  }
};
