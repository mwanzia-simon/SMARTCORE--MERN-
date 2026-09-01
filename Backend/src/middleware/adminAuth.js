// A middleware to check if the user is autheticated
import jwt from "jsonwebtoken";
export const adminAuth = (req, res, next) => {
  try {
    // Get the token from the cookies in the request object
    const { adminToken } = req.cookies;

    if (!adminToken)
      return res.json({
        success: false,
        message: "Not authorized!",
      });

    // if the token exists we decode the token
    const decodedToken = jwt.verify(adminToken, process.env.JWT_SECRET);

    if (decodedToken.email == process.env.ADMIN_EMAIL) {
      next();
    } else {
      return res.json({
        success: false,
        message: "Not authorized!",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
