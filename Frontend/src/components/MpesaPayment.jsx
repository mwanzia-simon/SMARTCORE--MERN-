import { useState } from "react";
import { Smartphone, Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const MpesaPayment = ({ address }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [cartArray, setCartArray] = useState([]);

  console.log(address._id);

  const {
    navigate,
    showMpesaPayment,
    setShowMpesaPayment,
    totalCost,
    cartItems,
    products,
  } = useAppContext();

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  // This use effect will run at least once and then it will set the cart array to a value
  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast.error("Please enter your M-Pesa phone number");
      return;
    }
    // Accepts:
    // 0712345678
    // 0112345678
    // +254712345678
    // 254712345678
    let formattedPhone = phoneNumber.trim().replace(/\s+/g, "");

    if (formattedPhone.startsWith("+254")) {
      formattedPhone = formattedPhone.replace("+", "");
    } else if (formattedPhone.startsWith("0")) {
      formattedPhone = `254${formattedPhone.substring(1)}`;
    }

    // Basic Kenyan phone validation
    if (!/^254(7|1)\d{8}$/.test(formattedPhone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      setPaymentStatus(null);

      const { data } = await api.post("/api/order/payment", {
        phoneNumber: formattedPhone,
        amount: totalCost,
        address: address._id,
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      });

      if (data.success) {
        setPaymentStatus("pending");

        toast.success(
          "Payment request sent. Check your phone and enter your M-Pesa PIN.",
        );

        // Optional callback
        if (onPaymentSuccess) {
          onPaymentSuccess(data);
        }
      } else {
        setPaymentStatus("failed");
        toast.error(data.message || "Payment request failed");
      }
    } catch (error) {
      setPaymentStatus("failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //   onpayment success callback function
  const onPaymentSuccess = async () => {
    // This function is supposed to check if the payment transation was succesifull by using a set interval function that runs every 3 seconds to check if the payment was succesifull
  };

  return (
    <div
      onClick={() => setShowMpesaPayment(!showMpesaPayment)}
      className="bg-black/70 min-h-screen flex items-center justify-center p-10 sm:0 fixed top-0 bottom-0 right-0 left-0 z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm mx-auto"
      >
        <div className="rounded-2xl border border-border-color bg-card p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-main">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary">
                Pay with M-Pesa
              </h2>

              <p className="text-sm text-muted">
                Complete your payment securely
              </p>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-6 rounded-xl bg-main p-4">
            <p className="text-sm text-secondary">Amount to pay</p>

            <p className="mt-1 text-2xl font-bold text-primary">
              KSh {Number(totalCost).toLocaleString()}
            </p>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-muted">
                M-Pesa Phone Number
              </label>

              <div className="relative ">
                <Smartphone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />

                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0712 345 678"
                  className="w-full bg-main rounded-xl border border-border-color py-3 pl-11 pr-4 outline-none transition focus:border-accent text-primary"
                  disabled={loading}
                />
              </div>

              <p className="mt-2 text-xs text-muted">
                You will receive an M-Pesa payment prompt on this number.
              </p>
            </div>

            {/* Payment Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-semibold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending Payment Request...
                </>
              ) : (
                <>
                  <Smartphone className="h-5 w-5" />
                  Pay KSh {Number(totalCost).toLocaleString()}
                </>
              )}
            </button>
          </form>

          {/* Pending Status */}
          {paymentStatus === "pending" && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-100 p-4">
              <Loader2 className="mt-0.5 h-5 w-5 animate-spin text-green-600" />

              <div>
                <p className="font-medium text-green-800">
                  Payment request sent
                </p>

                <p className="mt-1 text-sm text-green-700">
                  Check your phone and enter your M-Pesa PIN to complete the
                  payment.
                </p>
              </div>
            </div>
          )}

          {/* Failed Status */}
          {paymentStatus === "failed" && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <XCircle className="mt-0.5 h-5 w-5 text-red-600" />

              <div>
                <p className="font-medium text-red-800">
                  Payment request failed
                </p>

                <p className="mt-1 text-sm text-red-700">
                  Please check your details and try again.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MpesaPayment;
