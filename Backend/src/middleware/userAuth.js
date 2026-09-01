// A middleware to check if the user is autheticated
import jwt from "jsonwebtoken";
export const userAuth = (req, res, next) => {
  try {
    // Get the token from the cookies in the request object
    const { token } = req.cookies;

    if (!token)
      return res.json({
        success: false,
        message: "Not authorized.Login!",
      });

    // if the token exists we decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Adding the user id to the request object
    req.userID = decodedToken.userID;

    // Calling rhe next function
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
