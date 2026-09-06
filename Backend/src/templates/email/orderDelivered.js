export const orderDeliveredTemplate = ({
  name,
  deliveryAddress,
  deliveryDate,
  orderNumber,
  productsHTML,
  reviewLink,
  year,
}) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Delivered</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fb; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table width="320" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
          
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
              
              <!-- Success Icon -->
              <div style="
            width: 70px;
            height: 70px;
            margin: 0 auto 22px;
            background-color: #dcfce7;
            border-radius: 50%;
            line-height: 70px;
            text-align: center;
            font-size: 34px;
          ">
                🎉
              </div>
              
              <h2 style="
            margin: 0 0 18px;
            color: #111827;
            font-size: 25px;
            text-align: center;
          ">
                Your Order Has Been Delivered!
              </h2>
              
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hello ${name},
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
                Great news! Your SmartCore order has been successfully delivered.
                We hope you enjoy your new tech!
              </p>
              
              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            margin: 25px 0;
          ">
                <tr>
                  <td style="padding: 20px;">
                    
                    <p style="
                  margin: 0 0 15px;
                  color: #6b7280;
                  font-size: 13px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                ">
                      Order details
                    </p>
                    
                    <p style="margin: 0 0 10px; color: #374151; font-size: 14px;">
                      <strong>Order number:</strong> ${orderNumber}
                    </p>
                    
                    <p style="margin: 0 0 10px; color: #374151; font-size: 14px;">
                      <strong>Delivered on:</strong> ${deliveryDate}
                    </p>
                    
                    <p style="margin: 0; color: #374151; font-size: 14px;">
                      <strong>Delivered to:</strong> ${deliveryAddress}
                    </p>
                    
                  </td>
                </tr>
              </table>
              
              <!-- Product -->

              ${productsHTML} 
              <!-- Review Message -->
              <div style="
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 8px;
            padding: 18px;
            margin: 25px 0;
            text-align: center;
          ">
                
                <p style="
              margin: 0 0 8px;
              color: #1e40af;
              font-size: 15px;
              font-weight: bold;
            ">
                  How are you enjoying your new laptop?
                </p>
                
                <p style="
              margin: 0;
              color: #374151;
              font-size: 14px;
              line-height: 1.5;
            ">
                  We'd love to hear about your experience with your purchase.
                </p>
                
              </div>
              
              <!-- Review Button -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 28px auto 0;">
                <tr>
                  <td style="border-radius: 6px; background-color: #2563eb;">
                    <a href="${reviewLink}" style="
                     display: inline-block;
                     padding: 13px 24px;
                     color: #ffffff;
                     text-decoration: none;
                     font-size: 14px;
                     font-weight: bold;
                     border-radius: 6px;
                   ">
                      Leave a Review
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="font-size: 16px; line-height: 1.6; margin: 30px 0 0; text-align:center;">
                Thank you for shopping with us,<br>
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
