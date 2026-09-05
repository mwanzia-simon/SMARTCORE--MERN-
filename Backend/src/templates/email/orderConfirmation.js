export const orderConfirmationTemplate = ({
  name,
  orderNumber,
  orderDate,
  subtotal,
  deliveryFee,
  total,
  deliveryAddress,
  orderLink,
  productsHTML,
  estimatedDelivery,
  year,
}) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Confirmation - SmartCore</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fb; padding: 40px 15px;">
    <tr>
      <td align="center">
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px; background-color: #ffffff; border-radius: 16px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #111827; padding: 35px 30px;">
              
              <h1 style="margin: 0; color: #ffffff; font-size: 30px;">
                Smart<span style="color: #3b82f6;">Core</span>
              </h1>
              
              <p style="margin: 12px 0 0; color: #cbd5e1; font-size: 14px;">
                Power Meets Performance
              </p>
              
            </td>
          </tr>
          
          <!-- Order Confirmed -->
          <tr>
            <td align="center" style="padding: 45px 40px 20px;">
              
              <div style="
            width: 60px;
            height: 60px;
            line-height: 60px;
            border-radius: 50%;
            background-color: #dcfce7;
            color: #16a34a;
            font-size: 28px;
            margin: 0 auto 20px;
          ">
                ✓
              </div>
              
              <h2 style="margin: 0 0 12px; color: #111827; font-size: 26px;">
                Order Confirmed! 🎉
              </h2>
              
              <p style="margin: 0; color: #4b5563; font-size: 16px; line-height: 1.7;">
                Hi ${name}, thank you for shopping with SmartCore. We've received your order and we're getting it ready.
              </p>
              
            </td>
          </tr>
          
          <!-- Order Information -->
          <tr>
            <td style="padding: 25px 40px;">
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 10px;">
                
                <tr>
                  <td style="padding: 20px;">
                    
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; padding-bottom: 10px;">
                          Order Number
                        </td>
                        
                        <td align="right" style="color: #111827; font-size: 14px; font-weight: bold; padding-bottom: 10px;">
                          #${orderNumber}
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">
                          Order Date
                        </td>
                        
                        <td align="right" style="color: #111827; font-size: 14px;">
                          ${orderDate}
                        </td>
                      </tr>
                      
                    </table>
                    
                  </td>
                </tr>
                
              </table>
              
            </td>
          </tr>
          
          <!-- Products -->
          <tr>
            <td style="padding: 10px 40px 20px;">
              
              <h3 style="margin: 0 0 20px; color: #111827; font-size: 20px;">
                Your Order
              </h3>
              
              <!-- Product 1 -->
            ${productsHTML}
              
              <!-- Repeat the product block for additional products -->
              
            </td>
          </tr>
          
          <!-- Order Summary -->
          <tr>
            <td style="padding: 10px 40px 25px;">
                   
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                    Subtotal
                  </td>
                  
                  <td align="right" style="padding: 8px 0; color: #374151; font-size: 14px;">
                    KSh ${subtotal}
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                    Delivery
                  </td>
                  
                  <td align="right" style="padding: 8px 0; color: #374151; font-size: 14px;">
                    KSh ${deliveryFee}
                  </td>
                </tr>
                
                <tr>
                  <td colspan="2" style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
                  </td>
                </tr>
                
                <tr>
                  <td style="color: #111827; font-size: 18px; font-weight: bold;">
                    Total
                  </td>
                  
                  <td align="right" style="color: #2563eb; font-size: 20px; font-weight: bold;">
                    KSh ${total}
                  </td>
                </tr>
                
              </table>
              
            </td>
          </tr>
          
          <!-- Delivery Information -->
          <tr>
            <td style="padding: 10px 40px 30px;">
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #eff6ff; border-radius: 10px;">
                
                <tr>
                  <td style="padding: 20px;">
                    
                    <h3 style="margin: 0 0 10px; color: #1e3a8a; font-size: 16px;">
                      Delivery Information 📦
                    </h3>
                    
                    <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.7;">
                      ${deliveryAddress}
                    </p>
                    
                    <p style="margin: 10px 0 0; color: #4b5563; font-size: 13px;">
                      Estimated delivery: <strong>${estimatedDelivery}</strong>
                    </p>
                    
                  </td>
                </tr>
                
              </table>
              
            </td>
          </tr>
          
          <!-- CTA -->
          <tr>
            <td align="center" style="padding: 5px 40px 40px;">
              
              <a href="${orderLink}" style="display: inline-block;
            background-color: #2563eb;
            color: #ffffff;
            text-decoration: none;
            padding: 15px 32px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: bold;">
                View My Order
              </a>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #f8fafc; padding: 25px 30px; border-top: 1px solid #e5e7eb;">
              
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 13px;">
                Need help with your order? Contact our support team.
              </p>
              
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 13px;">
                © ${year} SmartCore. All rights reserved.
              </p>
              
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
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
