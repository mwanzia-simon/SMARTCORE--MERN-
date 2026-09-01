import Newsletter from "../models/newsletterModel.js";
import User from "../models/userModel.js";
import * as emailService from "../services/email/emailService.js";

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    const { userID } = req;
    if (!email)
      return res.json({
        success: false,
        message: "Email required to subscribe!",
      });

    const subscriber = await Newsletter.findOne({ email });
    const user = await User.findById(userID);

    if (subscriber)
      return res.json({
        success: false,
        message: "You have already subscribed!",
      });

    await Newsletter.create({ userID, email });

    await emailService.sendNewsletterSubscription(user);

    return res.json({
      success: true,
      message: "Subscribed to our newsletter succesifully!",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
