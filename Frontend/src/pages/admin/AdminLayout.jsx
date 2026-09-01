import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import {
  Calendar,
  ChartBar,
  ListOrdered,
  PlusSquareIcon,
  Settings,
  ShoppingBagIcon,
  User,
} from "lucide-react";
import api from "../../api/axios";

const AdminLayout = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { admin, setAdmin, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Dashboard", path: "/admin", icon: <ChartBar /> },
    {
      name: "Add Product",
      path: "/admin/add-product",
      icon: <PlusSquareIcon />,
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: <User />,
    },
    {
      name: "Product List",
      path: "/admin/product-list",
      icon: <ShoppingBagIcon />,
    },
    { name: "Orders", path: "/admin/orders", icon: <Calendar /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings /> },
  ];

  const logout = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);

    try {
      const { data } = await api.post("/api/admin/logout");
      if (data.success) {
        toast.success(data.message);
        setAdmin(null);
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-border-color py-3 bg-main">
        <Link to="/">
          <h1 className="text-xl font-bold text-primary">
            <span className="text-accent">Smart</span>Core
          </h1>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-primary text-sm">
          <p className="font-medium hidden sm:block">Hi! {admin.name}</p>

          <button
            onClick={() => navigate("/")}
            className="cursor-pointer px-4 py-1 border border-border-color text-secondary rounded-lg hover:bg-gray-700 hover:text-white transition duration-300"
          >
            Home
          </button>

          <button
            onClick={logout}
            disabled={logoutLoading}
            className={`cursor-pointer px-4 py-1 border border-red-500 text-red-500 rounded-lg transition duration-300
        hover:bg-red-500 hover:text-white
        ${logoutLoading ? "opacity-50 pointer-events-none" : ""}`}
          >
            {logoutLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-border-color pt-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-border-color text-primary"
                    : "hover:bg-accent border-white text-secondary"
                }`
              }
            >
              <div className="w-7 h-7 text-secondary">{item.icon}</div>
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
