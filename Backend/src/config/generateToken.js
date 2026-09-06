import jwt from "jsonwebtoken";

const generateToken = (res, id) => {
  const token = jwt.sign({ userID: id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Send the token as a cookie to the client
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: process.env.NODE_ENV == "production" ? "lax" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
