export const newsletterSubscriptionTemplate = ({
  name,
  year,
  unsubscribeUrl,
}) =>
  `
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
                Hello ${name},
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
                <a href="${unsubscribeUrl}" style="color: #6b7280; text-decoration: underline;">
                  Unsubscribe
                </a>
              </p>
              
              <p style="
            margin: 10px 0 0;
            color: #9ca3af;
            font-size: 12px;
          ">
                © ${year} SmartCore. All rights reserved.
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
