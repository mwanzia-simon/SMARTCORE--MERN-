import axios from "axios";

// const SWIFTWALLET_BASE_URL = "https://swiftwallet.co.ke/v3";

// const swiftwalletClient = axios.create({
//   baseURL: SWIFTWALLET_BASE_URL,
//   headers: {
//     Authorization: `Bearer ${process.env.SWIFTWALLET_API_KEY}`,
//     "Content-Type": "application/json",
//   },
// });

// const payload = {
//   action: "deposit",
//   wallet_type: "payments",
//   phone_number: phoneNumber,
//   amount,
// };

//  const payload = {
//       action: "deposit",
//       wallet_type: "payments",
//       phone_number: req.body.phone,
//       amount: req.body.amount
//     };

//     const response = await axios.post(
//       "https://swiftwallet.co.ke/v3/wallet/",
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );
export const initiateSTK = async ({
  order,
  amount,
  phoneNumber,
  customerName,
  external_reference,
}) => {
  const payload = {
    action: "deposit",
    wallet_type: "payments",
    phone_number: phoneNumber,
    amount,
  };
  try {
    const response = await axios.post(
      process.env.SWIFTWALLET_BASE_URL,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.SWIFTWALLET_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log(response);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Swift wallet STK initiation error:",
      error.response?.data || error.message,
    );
  }
};

export const handleCallback = async (callbackData) => {
  const { transaction_status, transaction_id, external_reference, amount } =
    callbackData;

  // here i write the code to handle the callback to check the status of the transaction
};
