import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

import * as authService from "../services/auth/authService.js";
import * as accountService from "../services/account/accountService.js";

// getCustomers function
export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({});

    return res.json({ success: true, customers: customers });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// getCustomerData function
export const getCustomerData = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await User.findById(id)
      .select(
        "firstName lastName email phoneNumber joined isAccountVerified role status",
      )
      .lean();
    const orders = await Order.find({ userID: id });
    const deliveredOrders = await Order.find({
      userID: id,
      status: "Delivered",
    });
    const totalOrders = orders.length;
    const totalSpent = deliveredOrders.reduce(
      (sum, order) => sum + order.amount,
      0,
    );

    return res.json({
      success: true,
      customer: { ...customer, orders: totalOrders, totalSpent },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// deleteCustomer function
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Customer deleted succesifully!",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// changeAccountRole function
export const changeAccountRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { newRole } = req.body;

    const user = await User.findByIdAndUpdate(id, { role: newRole });

    if (!user)
      return res.json({
        success: false,
        message: "User account does not exist!",
      });

    return res.json({ success: true, message: "Role updated succesifully!" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// changeAccountStatus function
export const changeAccountStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;

    const user = await User.findById(id);

    if (!user)
      return res.json({
        success: false,
        message: "User account does not exist!",
      });

    if (newStatus == "Active") {
      await accountService.activateAccount({ userID: id });
    } else if (newStatus == "Suspended") {
      await accountService.suspendCustomerAccount({ id });
    } else {
      // Logic to deactivate/Delete an account
    }

    return res.json({ success: true, message: "Status updated succesifully!" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// resentVerificationEmail
export const resendVerificationEmail = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.json({ success: false, message: "Provide a customer id!" });
  }
  try {
    const user = await User.findById(id);
    if (!user)
      return res.json({ success: false, message: "User does not exists!" });

    if (user.isAccountVerified)
      return res.json({ success: false, message: "Account already verified!" });
    await authService.sendVerifyAccountLink({ userID: id });
    return res.json({
      success: true,
      mesage: "verification link send succesifully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// resendPasswordResetOtp function
export const resendPasswordResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Provide a customer email!" });
  }
  try {
    await authService.sendPasswordResetOtp({ email });
    return res.json({
      success: true,
      mesage: "Reset OTP send succesifully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// suspendCustomerAccount function
export const suspendCustomerAccount = async (req, res) => {
  try {
    const { id } = req.body;
    await accountService.suspendCustomerAccount({ id });
    return res.json({
      success: true,
      message: "Account suspended succesifully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
