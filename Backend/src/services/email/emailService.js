import { sendEmail } from "./providers/nodemailerProvider.js";
import { welcomeEmailTemplate } from "../../templates/email/welcomeEmail.js";
import { passwordResetOtpTemplate } from "../../templates/email/passwordResetOtp.js";
import { passwordResetSuccesifullyTemplate } from "../../templates/email/passwordResetSuccesifully.js";
import { currentYear, formatDate, getTime } from "../../lib/utils.js";
import { accountVerificationTemplate } from "../../templates/email/accountVerification.js";
import { newsletterSubscriptionTemplate } from "../../templates/email/newsletterSubscription.js";
import { accountReactivationTemplate } from "../../templates/email/accountReactivation.js";
import { orderConfirmationTemplate } from "../../templates/email/orderConfirmation.js";
import { orderDeliveredTemplate } from "../../templates/email/orderDelivered.js";

// sendWelcomeEmail function
export const sendWelcomeEmail = async ({ user, url }) => {
  return sendEmail({
    to: user.email,
    subject: "Welcome to SmartCore 🚀!",
    html: welcomeEmailTemplate({
      name: user.firstName,
      url,
      year: currentYear,
    }),
  });
};

// sendPasswordResetOtp function
export const sendPasswordResetOtp = async (user, otp) => {
  return sendEmail({
    to: user.email,
    subject: "Password Reset OTP 🔒",
    html: passwordResetOtpTemplate({
      name: user.firstName,
      otp,
      year: currentYear,
    }),
  });
};

// sendPasswordResetSuccesifully function
export const sendPasswordResetSuccesifully = async (user) => {
  return sendEmail({
    to: user.email,
    subject: "Password reset succesifully 🎉",
    html: passwordResetSuccesifullyTemplate({
      name: user.firstName,
      resetTime: getTime,
      resetDate: formatDate(new Date(Date.now())),
      year: currentYear,
    }),
  });
};

// sendAccountVerificationLink function
export const sendAccountVerificationLink = async (user, link) => {
  return sendEmail({
    to: user.email,
    subject: "Verify you SmartCore Account!",
    html: accountVerificationTemplate({
      name: user.firstName,
      link,
      year: currentYear,
    }),
  });
};

// sendNewsletterSubscription function
export const sendNewsletterSubscription = async (user) => {
  return sendEmail({
    to: user.email,
    subject: "SmartCore newsletter 📰",
    html: newsletterSubscriptionTemplate({
      name: user.firstName,
      unsubscribeUrl: "",
      year: currentYear,
    }),
  });
};

// sendAccountReactivationLink function
export const sendAccountReactivationLink = async (user, link) => {
  return sendEmail({
    to: user.email,
    subject: "Account Reactivation Link 🔒",
    html: accountReactivationTemplate({
      name: user.firstName,
      link,
      year: currentYear,
    }),
  });
};

// sendOrderConfirmation function
export const sendOrderConfirmation = async ({
  user,
  productsHTML,
  deliveryAddress,
  deliveryFee,
  estimatedDelivery,
  orderDate,
  orderLink,
  orderNumber,
  subtotal,
  total,
}) => {
  return sendEmail({
    to: user.email,
    subject: "Order confirmation!",
    html: orderConfirmationTemplate({
      name: user.firstName,
      year: currentYear,
      productsHTML,
      deliveryAddress,
      deliveryFee,
      estimatedDelivery,
      orderDate,
      orderLink,
      orderNumber,
      subtotal,
      total,
    }),
  });
};

// sendOrderDeliveredEmail function
export const sendOrderDeliveredEmail = async ({
  user,
  reviewLink,
  deliveryAddress,
  deliveryDate,
  orderNumber,
  productsHTML,
}) => {
  return sendEmail({
    to: user.email,
    subject: "Order delivered!",
    html: orderDeliveredTemplate({
      name: user.firstName,
      year: currentYear,
      deliveryAddress,
      deliveryDate,
      orderNumber,
      productsHTML,
      reviewLink,
    }),
  });
};
