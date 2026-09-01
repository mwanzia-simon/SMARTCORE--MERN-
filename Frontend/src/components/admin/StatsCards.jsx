import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { useAppContext } from "../../context/AppContext";

const StatsCards = () => {
  const [revenue, setRevenue] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [orders, setOrders] = useState(0);
  const { currency } = useAppContext();

  const getRevenue = async () => {
    try {
      const { data } = await api.get("/api/order/revenue");
      setRevenue(data.revenue);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCustomers = async () => {
    try {
      const { data } = await api("/api/customers");
      data.success && setCustomers(data.customers.length);
      console.log(data.customers.length);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await api.get("/api/order/admin");

      const placedOrders = data.orders.filter(
        (order) => order.status == "Order Placed",
      ).length;
      setOrders(placedOrders);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getRevenue();
    getOrders();
    getCustomers();
  }, []);
  return (
    <>
      <Card
        title="Products Revenue"
        value={`${currency} ${revenue.toLocaleString()}`}
      />
      <Card title="Orders" value={orders} />
      <Card title="Customers" value={customers} />
    </>
  );
};

const Card = ({ title, value }) => {
  return (
    <div className="p-4 bg-card col-span-12 lg:col-span-4 border border-border-color rounded-xl">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h1 className="text-muted mb-2 text-sm">{title}</h1>
          <p className="text-3xl font-semibold text-secondary">{value}</p>
        </div>
      </div>
    </div>
  );
};
export default StatsCards;
