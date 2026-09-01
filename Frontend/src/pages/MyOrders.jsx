import React, { useEffect, useState } from "react";
import {
  Package,
  CreditCard,
  CalendarDays,
  CircleDollarSign,
  Hash,
  ShoppingBag,
  X,
  XCircle,
  Box,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import api from "../api/axios";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, user } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [OrderId, setOrderId] = useState("");

  const fetchMyOrders = async () => {
    try {
      const { data } = await api.get("/api/order/user");

      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  const getStatusColor = (statusText) => {
    const status = statusText.toLowerCase();

    if (status === "order placed") {
      return "text-orange-400 bg-orange-400/10";
    } else if (status === "processing") {
      return "text-yellow-500 bg-yellow-500/10";
    } else if (status === "delivered") {
      return "text-green-500 bg-green-500/10";
    } else {
      return "text-red-500 bg-red-500/10";
    }
  };

  const handleCancelOrder = async (id) => {
    setIsDeleting(true);

    try {
      const { data } = await api.patch(`/api/order/status/${id}`, {
        status: "Cancelled",
      });

      data.success
        ? toast.success("Order cancelled succesifully!")
        : toast.error(data.message);

      fetchMyOrders();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="mt-16 pb-20 max-w-6xl mx-auto px-4">
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-primary">My Orders</h1>
          <p className="text-muted mt-2">
            View and manage all your SmartCore purchases.
          </p>

          <div className="w-24 h-1 rounded-full bg-accent mt-4"></div>
        </div>

        {myOrders.length === 0 ? (
          <div className="bg-card border border-border-color rounded-2xl p-14 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-main flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-2xl font-semibold text-primary mt-6">
              No Orders Yet
            </h2>

            <p className="text-muted mt-3 max-w-md mx-auto">
              Looks like you haven't placed an order yet. Once you purchase a
              product it will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {myOrders.map((order, index) => (
              <div
                key={index}
                className="bg-card border border-border-color rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Order Header */}

                <div className="border-b border-border-color p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-main flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold text-primary">
                            Order
                          </h2>

                          <p className="text-muted">
                            SC-{order._id.slice(0, 10)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-primary" />

                          <div>
                            <p className="text-xs text-muted uppercase">
                              Payment
                            </p>

                            <p className="text-primary font-medium">
                              {order.paymentType}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <CalendarDays className="w-5 h-5 text-primary" />

                          <div>
                            <p className="text-xs text-muted uppercase">
                              Ordered On
                            </p>

                            <p className="text-primary font-medium">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <CircleDollarSign className="w-5 h-5 text-primary" />

                          <div>
                            <p className="text-xs text-muted uppercase">
                              Total
                            </p>

                            <p className="text-primary font-semibold">
                              {currency} {order.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      <Box/>
                       {order.status}
                    </div>
                  </div>
                </div>

                {/* Products */}

                <div className="p-6 space-y-5">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-main/40 rounded-2xl border border-border-color p-5 hover:border-primary/30 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex gap-5">
                          <div className="w-28 h-28 rounded-2xl bg-card border border-border-color flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img
                              src={
                                item.product?.image[0]
                                  ? item.product.image[0]
                                  : null
                              }
                              alt=""
                              className="w-full h-full object-contain p-2"
                            />
                          </div>

                          <div className="flex flex-col justify-center">
                            <h3 className="text-xl font-semibold text-primary">
                              {item.product?.name}
                            </h3>

                            <p className="text-muted mt-1">
                              {item.product?.category}
                            </p>

                            <div className="flex flex-wrap gap-6 mt-5">
                              <div>
                                <p className="text-xs uppercase text-muted">
                                  Quantity
                                </p>

                                <p className="text-primary font-medium">
                                  {item.quantity || "1"}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs uppercase text-muted">
                                  Amount
                                </p>

                                <p className="text-primary font-semibold">
                                  {currency}{" "}
                                  {(
                                    item.product?.offerPrice * item.quantity
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-3"></div>
                      </div>
                    </div>
                  ))}
                </div>
                {order.status.toLowerCase() !== "cancelled" &&
                  order.status.toLowerCase() !== "delivered" && (
                    <button
                      onClick={() => {
                        setOrderId(order._id);
                        setShowModal(true);
                      }}
                      className="flex items-center justify-center gap-2 ml-5 mb-4 px-2 py-1 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      <XCircle size={20} />
                      Cancel Order
                    </button>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-card border border-border-color rounded-2xl w-full max-w-md p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-primary">Cancel Order</h3>

            <p className="text-muted mt-3">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-xl border border-border-color text-primary hover:bg-main transition"
              >
                Keep Order
              </button>

              <button
                onClick={() => handleCancelOrder(OrderId)}
                disabled={isDeleting}
                className={`px-5 py-2 rounded-xl bg-red-500 text-white transition ${
                  isDeleting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-600"
                }`}
              >
                {isDeleting ? "Cancelling..." : "Cancel Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyOrders;
