export const welcomeEmailTemplate = ({ name, url, year }) =>
  `
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
            Welcome to SmartCore, ${name}! 👋
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
          <a href="${url}"
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
            © ${year} SmartCore. All rights reserved.
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
