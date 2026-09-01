import axios from "axios";
import { initiateSTK } from "./providers/swiftwalletProvider.js";

export const initiatePayment = async ({
  order,
  amount,
  phoneNumber,
  customerName,
  external_reference,
}) => {
  console.log({ order, phoneNumber, customerName });
  await initiateSTK({
    order,
    amount,
    phoneNumber,
    customerName,
    external_reference,
  });

  // After the stk has been intiated succesifully we will have the function to handle the callback function

  
};

// router.post("/stk", async (req, res) => {
//   try {
//     const {
//       amount,
//       phone_number,
//       external_reference,
//       customer_name
//     } = req.body;

//     const response = await axios.post(
//       "https://swiftwallet.co.ke/v3/stk-initiate/",
//       {
//         amount,
//         phone_number,
//         external_reference,
//         customer_name,
//         callback_url:
//           "https://yourdomain.com/api/payments/callback"
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.SWIFTWALLET_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     res.status(200).json(response.data);

//   } catch (error) {
//     console.error(
//       "SwiftWallet STK error:",
//       error.response?.data || error.message
//     );

//     res.status(500).json({
//       success: false,
//       message: "Failed to initiate STK",
//       error: error.response?.data || error.message
//     });
//   }
// });
