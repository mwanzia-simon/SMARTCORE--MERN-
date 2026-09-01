import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { ArrowLeft, ArrowRight, XCircleIcon } from "lucide-react";
import api from "../api/axios";

const Cart = () => {
  const {
    user,
    products,
    currency,
    navigate,
    cartItems,
    deliveryFee,
    setCartItems,
    getCartCount,
    getCartAmount,
    updateCartItem,
    setDeliveryFee,
    removeFromCart,
    selectedAddress,
    setSelectedAddress,
    setShowMpesaPayment,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [loading, setLoading] = useState(false);

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  
  const getUserAddresses = async () => {
    try {
      const { data } = await api.get("/api/address/get");

      if (data.success) {
        setAddress(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        toast.info("Please Select an Address");
        return;
      }
      setLoading(true);

      // Place Order with COD
      if (paymentOption === "COD") {
        if (cartArray.length === 0) {
          toast.error("No cart items!");
          return;
        }
        const { data } = await api.post("/api/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        }
      } else {
        setShowMpesaPayment(true);
        // Place order with mpesa
        // const { data } = await api.post("/api/order/mpesa", {});
        // Mpesa intergration using swift wallet
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to get the delivery fee based on the address of the user
  const getDeliveryFee = async () => {
    if (!selectedAddress) return;
    try {
      const { data } = await api.post("/api/location/delivery-fee", {
        region: selectedAddress.region,
      });
      data.success && setDeliveryFee(data.deliveryFee);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDeliveryFee();
  }, [selectedAddress]);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddresses();
    }
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6 text-primary">
          Shopping Cart{" "}
          <span className="text-sm text-muted">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-secondary text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-primary items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${
                      product._id
                    }`,
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-border-color rounded"
              >
                <img
                  className="max-w-full h-full object-contain"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="h md:block font-semibold text-primary">
                  {product.name}
                </p>
                <div className="font-normal text-muted">
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-muted">Qty:</p>
                    <select
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                      className="outline-none bg-card border border-border-color text-primary"
                    >
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 9,
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}{" "}
              {parseFloat(
                (product.offerPrice * product.quantity).toFixed(2),
              ).toLocaleString()}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <XCircleIcon className="inline-block w-6 h-6 text-[crimson]" />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition " />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-card p-5 max-md:mt-16 border border-border-color">
        <h2 className="text-xl md:text-xl font-medium text-primary">
          Order Summary
        </h2>
        <hr className="border-border-color my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-secondary">
            Delivery Address
          </p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-muted">
              {selectedAddress
                ? `${selectedAddress.firstName} ${selectedAddress.lastName}, ${selectedAddress.region}, ${selectedAddress.city}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-main border border-border-color text-sm w-full text-primary">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-primary p-2 hover:bg-accent-hover"
                  >
                    {address.firstName} {address.lastName}, {address.region},{" "}
                    {address.city}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primabg-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6 text-primary">
            Payment Method
          </p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-border-color bg-main text-primary px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-border-color" />

        <div className="text-secondary mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency} {getCartAmount().toLocaleString()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="text-accent">
              {currency} {deliveryFee.toLocaleString()}
            </span>
          </p>

          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency} {(getCartAmount() + deliveryFee).toLocaleString()}
            </span>
          </p>
        </div>

        {user ? (
          <button
            onClick={placeOrder}
            disabled={cartArray.length === 0 || loading}
            className={`w-full py-3 mt-6 cursor-pointer bg-accent text-primary font-medium hover:bg-accent-hover transition disabled:bg-gray-500 disabled:cursor-not-allowed ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? "Processing..."
              : paymentOption === "COD"
                ? "Place Order"
                : "Proceed to Checkout"}
          </button>
        ) : (
          <button
            disabled
            className="w-full py-3 mt-6 bg-gray-300 text-gray-600 font-medium cursor-not-allowed"
          >
            Login to proceed
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="mt-16 text-center text-gray-500">Your cart is empty.</div>
  );
};

export default Cart;
