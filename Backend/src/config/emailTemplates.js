export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to SmartCore</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fb; padding: 40px 15px;">
    <tr>
      <td align="center">

    <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden;">

      <tr>
        <td align="center"
          style="background-color: #111827; padding: 35px 30px;">

          <h1 style="margin: 0; color: #ffffff; font-size: 30px; letter-spacing: -1px;">
            Smart<span style="color: #3b82f6;">Core</span>
          </h1>

          <p style="margin: 12px 0 0; color: #cbd5e1; font-size: 14px;">
            Power Meets Performance
          </p>

        </td>
      </tr>

      <tr>
        <td style="padding: 40px 40px 20px;">

          <h2 style="margin: 0 0 15px; color: #111827; font-size: 26px;">
            Welcome to SmartCore, {{name}}! 👋
          </h2>

          <p style="margin: 0; color: #4b5563; font-size: 16px; line-height: 1.7;">
            Your account has been successfully created. Welcome to a smarter way to discover high-performance laptops built for creators, developers, students, professionals, and everyone who demands more from their technology.
          </p>

        </td>
      </tr>

      <tr>
        <td style="padding: 20px 40px;">

          <table width="100%" cellpadding="0" cellspacing="0" border="0"
            style="background-color: #eff6ff; border-radius: 12px;">

            <tr>
              <td style="padding: 25px;">

                <h3 style="margin: 0 0 10px; color: #1d4ed8; font-size: 18px;">
                  Your SmartCore journey starts now 🚀
                </h3>

                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.7;">
                  Explore powerful laptops, compare specifications, find the right device for your needs, and enjoy a seamless shopping experience designed around you.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>

      <tr>
        <td style="padding: 20px 40px;">

          <h3 style="margin: 0 0 20px; color: #111827; font-size: 20px;">
            What you can do with your account
          </h3>

          <p style="margin: 12px 0; color: #4b5563; font-size: 15px;">
            ✓ Browse powerful laptops and accessories
          </p>

          <p style="margin: 12px 0; color: #4b5563; font-size: 15px;">
            ✓ Save your favorite products
          </p>

          <p style="margin: 12px 0; color: #4b5563; font-size: 15px;">
            ✓ Track your orders with ease
          </p>

          <p style="margin: 12px 0; color: #4b5563; font-size: 15px;">
            ✓ Enjoy a personalized shopping experience
          </p>

        </td>
      </tr>

      <tr>
        <td align="center" style="padding: 20px 40px 40px;">

          <a href="https://your-smartcore-website.com"
            style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-size: 15px; font-weight: bold;">
            Explore SmartCore →
          </a>

        </td>
      </tr>

      <tr>
        <td align="center"
          style="background-color: #f8fafc; padding: 25px 30px; border-top: 1px solid #e5e7eb;">

          <p style="margin: 0 0 10px; color: #6b7280; font-size: 13px;">
            Thank you for choosing SmartCore.
          </p>

          <p style="margin: 0; color: #9ca3af; font-size: 12px;">
            © 2026 SmartCore. All rights reserved.
          </p>

          <p style="margin: 12px 0 0; color: #9ca3af; font-size: 12px;">
            This is an automated message. Please do not reply directly to this email.
          </p>

        </td>
      </tr>

    </table>

  </td>
</tr>
  </table>

</body>
</html>

`;

export const PASSWORD_RESET_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset OTP</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fb; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #111827; padding: 28px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; letter-spacing: -0.5px;">
                smart<span style="color: #3b82f6;">Core</span>
              </h1>
              <p style="margin: 12px 0 0; color: #cbd5e1; font-size: 14px;">
                Power Meets Performance
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 35px; color: #374151;">
              
              <h2 style="margin: 0 0 18px; color: #111827; font-size: 24px;">
                Password Reset Request
              </h2>
              
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 18px;">
                Hello {{name}},
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                We received a request to reset the password for your SmartCore account.
                Use the verification code below to continue resetting your password.
              </p>
              
              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding: 25px 0;">
                    
                    <div style="
                  display: inline-block;
                  background-color: #eff6ff;
                  border: 1px solid #bfdbfe;
                  border-radius: 10px;
                  padding: 20px 35px;
                ">
                      <p style="
                    margin: 0 0 8px;
                    color: #6b7280;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  ">
                        Your verification code
                      </p>
                      
                      <div style="
                    color: #2563eb;
                    font-size: 36px;
                    font-weight: bold;
                    letter-spacing: 8px;
                  ">
                        {{otp}}
                      </div>
                    </div>
                    
                  </td>
                </tr>
              </table>
              
              <p style="font-size: 15px; line-height: 1.6; margin: 20px 0 0;">
                This code will expire in <strong>15 minutes</strong>.
                For your security, please do not share this code with anyone.
              </p>
              
              <p style="font-size: 15px; line-height: 1.6; margin: 22px 0 0;">
                If you did not request a password reset, you can safely ignore this email.
                Your account will remain secure.
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; margin: 30px 0 0;">
                Stay secure,<br>
                <strong>The SmartCore Team</strong>
              </p>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 22px 30px; text-align: center;">
              
              <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                This is an automated message from SmartCore.
                Please do not reply to this email.
              </p>
              
              <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">
                © 2026 SmartCore. All rights reserved.
              </p>
              
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
    
  </table>
</body>

</html>
`;
export const PASSWORD_RESET_SUCCESIFULLY_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fb; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #111827; padding: 28px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; letter-spacing: -0.5px;">
                smart<span style="color: #3b82f6;">Core</span>
              </h1>
              <p style="margin: 12px 0 0; color: #cbd5e1; font-size: 14px;">
                Power Meets Performance
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 35px; color: #374151; text-align: center;">
              
              <!-- Success Icon -->
              <div style="
            width: 70px;
            height: 70px;
            margin: 0 auto 22px;
            background-color: #dcfce7;
            border-radius: 50%;
            line-height: 70px;
            font-size: 36px;
            color: #16a34a;
          ">
                ✓
              </div>
              
              <h2 style="margin: 0 0 18px; color: #111827; font-size: 25px;">
                Password Reset Successful
              </h2>
              
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hello {{name}},
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                Your SmartCore account password has been successfully reset.
                You can now sign in using your new password.
              </p>
              
              <!-- Security Details -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            margin: 25px 0;
          ">
                <tr>
                  <td style="padding: 18px; text-align: left;">
                    
                    <p style="
                  margin: 0 0 12px;
                  color: #6b7280;
                  font-size: 13px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                ">
                      Security details
                    </p>
                    
                    <p style="margin: 0 0 8px; color: #374151; font-size: 14px;">
                      <strong>Password changed:</strong>
                      {{resetDate}}
                    </p>
                    
                    <p style="margin: 0; color: #374151; font-size: 14px;">
                      <strong>Time:</strong>
                      {{resetTime}}
                    </p>
                    
                  </td>
                </tr>
              </table>
              
              <!-- Success Message -->
              <div style="
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 8px;
            padding: 16px;
            margin: 25px 0;
            color: #166534;
            font-size: 14px;
          ">
                ✓ Your account password has been updated successfully.
              </div>
              
              <p style="font-size: 15px; line-height: 1.6; margin: 25px 0 0;">
                If you did not make this change, please contact our support team
                immediately to help secure your account.
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; margin: 30px 0 0;">
                Stay secure,<br>
                <strong>The SmartCore Team</strong>
              </p>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 22px 30px; text-align: center;">
              
              <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                This is an automated message from SmartCore.
                Please do not reply to this email.
              </p>
              
              <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">
                © 2026 SmartCore. All rights reserved.
              </p>
              
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
    
  </table>
</body>

</html>

`;

export const NEWSLETTER_SUBSCRIPTION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter Subscription Confirmed</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fb; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #111827; padding: 28px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; letter-spacing: -0.5px;">
                smart<span style="color: #3b82f6;">Core</span>
              </h1>
              <p style="margin: 12px 0 0; color: #cbd5e1; font-size: 14px;">
                Power Meets Performance
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 35px; color: #374151; text-align: center;">
              
              <!-- Newsletter Icon -->
              <div style="
            width: 70px;
            height: 70px;
            margin: 0 auto 22px;
            background-color: #dbeafe;
            border-radius: 50%;
            line-height: 70px;
            font-size: 34px;
          ">
                ✉️
              </div>
              
              <h2 style="
            margin: 0 0 18px;
            color: #111827;
            font-size: 25px;
          ">
                You're In!
              </h2>
              
              <p style="
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 20px;
          ">
                Hello {{name}},
              </p>
              
              <p style="
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 25px;
          ">
                Thanks for subscribing to the SmartCore newsletter!
                You'll now be among the first to hear about our latest laptops,
                new arrivals, exclusive offers, and exciting tech updates.
              </p>
              
              <!-- Subscription Confirmation -->
              <div style="
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 8px;
            padding: 18px;
            margin: 25px 0;
            color: #166534;
            font-size: 14px;
            line-height: 1.5;
          ">
                ✓ Your email has been successfully added to the SmartCore newsletter.
              </div>
              
              <p style="
            font-size: 15px;
            line-height: 1.6;
            margin: 25px 0;
            color: #4b5563;
          ">
                We promise to keep things useful and relevant.
                No unnecessary spam—just the tech updates that matter.
              </p>
              
              <!-- Button -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 28px auto 0;">
                <tr>
                  <td style="border-radius: 6px; background-color: #2563eb;">
                    <a href="{{websiteUrl}}" style="
                     display: inline-block;
                     padding: 13px 24px;
                     color: #ffffff;
                     text-decoration: none;
                     font-size: 14px;
                     font-weight: bold;
                     border-radius: 6px;
                   ">
                      Explore SmartCore
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="
            font-size: 16px;
            line-height: 1.6;
            margin: 30px 0 0;
          ">
                Welcome to the community,<br>
                <strong>The SmartCore Team</strong>
              </p>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 22px 30px; text-align: center;">
              
              <p style="
            margin: 0;
            color: #9ca3af;
            font-size: 12px;
            line-height: 1.5;
          ">
                You're receiving this email because you subscribed to the SmartCore newsletter.
              </p>
              
              <p style="
            margin: 10px 0 0;
            color: #9ca3af;
            font-size: 12px;
          ">
                <a href="{{unsubscribeUrl}}" style="color: #6b7280; text-decoration: underline;">
                  Unsubscribe
                </a>
              </p>
              
              <p style="
            margin: 10px 0 0;
            color: #9ca3af;
            font-size: 12px;
          ">
                © 2026 SmartCore. All rights reserved.
              </p>
              
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
    
  </table>
</body>

</html>
`;

export const ACCOUNT_VERIFICATION_EMAIL_TEMPLATE = ``;

export const ACCOUNT_REACTIVATION_EMAIL_TEMPLATE =``
