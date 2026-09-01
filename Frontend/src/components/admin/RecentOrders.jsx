import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { useAppContext } from "../../context/AppContext";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const { currency, navigate } = useAppContext();

  useEffect(() => {
    const getRecentOrders = async () => {
      try {
        const { data } = await api.get("/api/order/admin");
        data.success
          ? setOrders(data.orders.slice(0, 4))
          : toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getRecentOrders();
  }, []);

  const getStatusColor = (statusText) => {
    const status = statusText.toLowerCase();

    if (status === "order placed") {
      return "text-orange-400 ";
    } else if (status === "processing") {
      return "text-yellow-500 ";
    } else if (status === "delivered") {
      return "text-green-500 ";
    } else {
      return "text-red-500 ";
    }
  };
  return (
    <div className=" space-y-4  col-span-12">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-primary">Recent Orders</h2>
        <p
          onClick={() => navigate("/admin/orders")}
          className="text-accent underline cursor-pointer"
        >
          See all
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-primary">
          <thead className="bg-card text-sm  text-primary">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Order status</th>
              <th className="py-3 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b border-border-color hover:bg-card/20 cursor-pointer"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{order._id}</td>
                  <td className="p-4">
                    {order.address.firstName} {order.address.lastName}
                  </td>
                  <td className={`${getStatusColor(order.status)} p-4`}>
                    {order.status}
                  </td>
                  <td className="p-4">
                    {currency} {order.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-primary">
                  No Recent Orders yet!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
