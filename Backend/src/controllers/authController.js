import * as authService from "../services/auth/authService.js";
import * as accountService from "../services/account/accountService.js";

// Register function
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const newUser = await authService.register(
      { firstName, lastName, email, phoneNumber, password },
      res,
    );
    return res.json({
      success: true,
      message: "Registered succesifully!",
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        cartItems: newUser.cartItems,
        profilePicture: newUser.profilePicture,
        joined: newUser.joined,
        phoneNumber: newUser.phoneNumber,
        isAccountVerified: newUser.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.login({ email, password }, res);

    return res.json({
      success: true,
      message: "Logged in succesifully!",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        cartItems: user.cartItems,
        profilePicture: user.profilePicture,
        joined: user.joined,
        phoneNumber: user.phoneNumber,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// logout function
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "Production",
      sameSite: process.env.NODE_ENV == "Production" ? "none" : "strict",
    });
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// sendPasswordResetOtp function
export const sendPasswordResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.sendPasswordResetOtp({ email });
    return res.json({ success: true, message: "OTP Send succesifully!" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// verifyPasswordResetOtp function
export const verifyPasswordResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    await authService.verifyPasswordResetOtp({ email, otp });
    return res.json({ success: true, message: "OTP verified succesifully!" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// resetPassword function
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    await authService.resetPassword({ email, newPassword });
    return res.json({
      success: true,
      message: "Password reset succesifully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// changePassword function
export const changePassword = async (req, res) => {
  try {
    const { userID } = req;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    await accountService.changePassword({
      userID,
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return res.json({
      success: true,
      message: "Password updated succesifully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// sendVerifyAccountLink function
export const sendVerifyAccountLink = async (req, res) => {
  try {
    const { userID } = req;
    await authService.sendVerifyAccountLink({ userID });
    return res.json({
      success: true,
      message: "Verification link send to your email!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// verifyAccount function
export const verifyAccount = async (req, res) => {
  try {
    const { userID } = req;
    const { token } = req.body;
    await authService.verifyAccount({ userID, token });
    return res.json({
      success: true,
      message: "Account verified succesifully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// deleteAccount function
export const deleteAccount = async (req, res) => {
  try {
    const { userID } = req;
    const { securityPassword } = req.body;
    await accountService.deleteAccount({ userID, securityPassword });
    return res.json({
      success: true,
      message: "Account deleted succesifully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// activateAccount function
export const activateAccount = async (req, res) => {
  try {
    const { userID } = req;
    await accountService.activateAccount({ userID });
    return res.json({
      success: true,
      message: "Reactivation link send to your email!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// verifyReactivation function
export const verifyReactivation = async (req, res) => {
  try {
    const { userID } = req;
    const { token } = req.body;
    await accountService.verifyReactivation({ userID, token });
    return res.json({
      success: true,
      message: "Account activated succesifully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
