export const accountReactivationTemplate = ({ name, link, year }) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reactivate Your SmartCore Account</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
    <tr>
      <td align="center">
        
        <table width="320" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="background:#111827;padding:30px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; letter-spacing: -0.5px;">
                smart<span style="color: #3b82f6;">Core</span>
              </h1>
              <p style="margin: 12px 0 0; color: #cbd5e1; font-size: 14px;">
                Power Meets Performance
              </p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:40px 30px;color:#333333;">
              
              <h2 style="margin-top:0;color:#111827;">
                Reactivate Your Account
              </h2>
              
              <p style="font-size:16px;line-height:1.7;">
                Hi ${name},
              </p>
              
              <p style="font-size:16px;line-height:1.7;">
                We received a request to reactivate your <strong>SmartCore</strong> account.
              </p>
              
              <p style="font-size:16px;line-height:1.7;">
                If you'd like to restore your account along with your saved profile, orders, and other information, click the button below.
              </p>
              
              <table cellpadding="0" cellspacing="0" style="margin:30px auto;">
                <tr>
                  <td align="center" bgcolor="#3b82f6" style="border-radius:6px;">
                    <a href="{{reactivationLink}}" style="display:inline-block;padding:15px 35px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:bold;">
                      Reactivate My Account
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="font-size:15px;line-height:1.7;">
                If the button above doesn't work, copy and paste this link into your browser:
              </p>
              
              <p style="word-break:break-all;">
                <a href=" ${link}" style="color:#3b82f6;">
                ${link}
                </a>
              </p>
              
              <p style="font-size:15px;color:#666666;">
                For your security, this link will expire in <strong>30 minutes</strong>.
              </p>
              
              <hr style="border:none;border-top:1px solid #eeeeee;margin:30px 0;">
              
              <p style="font-size:14px;color:#777777;">
                If you didn't request to reactivate your account, you can safely ignore this email. Your account will remain scheduled for permanent deletion.
              </p>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f9f9f9;padding:20px;color:#888888;font-size:13px;">
              © ${year} SmartCore Technologies. All rights reserved.
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>

</html>
`;
