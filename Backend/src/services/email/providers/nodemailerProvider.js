import transporter from "../../../config/nodemailer.js";

export const sendEmail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html,
  });
};
 