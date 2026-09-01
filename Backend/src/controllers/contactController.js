// Function to send the message from the client to the server

import Contact from "../models/contactModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { userID } = req;
    const { name, email, message } = req.body;

    // validate the fields
    if (!name || !email || !message)
      return res.json({ success: false, message: "All fields required!" });

    // Save the message to the db
    await Contact.create({
      userID,
      name,
      email,
      message,
    });

    // Later i will use nodemailer to send the same message to the websites email
    //  here .....

    return res.json({success:true,message:"Message send succesifully!"})
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
