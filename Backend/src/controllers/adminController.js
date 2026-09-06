// Admin login
// api/admin/login

import jwt from "jsonwebtoken";
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ success: false, message: "All fields required!" });

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Generating a token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      //   Sending the cookie to the client
      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "Production",
        sameSite: process.env.NODE_ENV == "Production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true, message: "Logged in succesifully!" });
    } else {
      return res.json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Function to check if the admin is autheticated
// /api/admin/isAutheticated
export const isAdminAuth = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    return res.json({
      success: true,
      data: {
        name: "Admin",
        email: adminEmail,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// A function for the admin to logout
// api/admin/logout

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "lax" : "strict",
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
