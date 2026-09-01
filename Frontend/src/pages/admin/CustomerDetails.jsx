import {
  Mail,
  Phone,
  User,
  Shield,
  Calendar,
  ShoppingBag,
  BadgeCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { formatDate } from "../../lib/utils";
import Loader from "../../components/Loader";
import { useAppContext } from "../../context/AppContext";

const CustomerDetails = () => {
  const { id } = useParams();

  const [customer, setCustomer] = useState([]);
  const { currency } = useAppContext();

  //   A function to fetch customer details
  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const { data } = await api.get(`/api/customers/${id}`);
        data.success && setCustomer(data.customer);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getCustomerData();
  }, []);

  // A function to handle account role change
  const handleRoleChange = async (id, newRole) => {
    try {
      const { data } = await api.post(`/api/customers/role/${id}`, { newRole });

      if (data.success) {
        toast.success(data.message);
        setCustomer({ ...customer, role: newRole });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await api.post(`/api/customers/status/${id}`, {
        newStatus,
      });

      if (data.success) {
        toast.success(data.message);
        setCustomer({ ...customer, status: newStatus });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResentVerificationEmail = async () => {
    try {
      const { data } = await api.post(
        "/api/customers/resend-verification-email",
        { id },
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSendResetPasswordOtp = async () => {
    try {
      const { data } = await api.post(
        "/api/customers/resend-password-reset-otp",
        { email: customer.email },
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSuspendAccount = async () => {
    try {
      const { data } = await api.post("/api/customers/suspend-account", { id });
      console.log(data);
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setCustomer({ ...customer, status: "Suspended" });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 space-y-6 mx-auto h-[95vh] overflow-y-scroll">
      {/* Header */}
      {!customer ? (
        <Loader />
      ) : (
        <>
          <div className="bg-card rounded-xl shadow border border-border-color p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-slate-500 flex items-center justify-center text-3xl font-bold text-primary">
                {customer?.firstName?.charAt(0)}
              </div>

              <div>
                <h1 className="text-2xl font-semibold text-primary">
                  {customer.firstName} {customer.lastName}
                </h1>
                <p className="text-muted">{customer.email}</p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border-color shadow p-6 text-primary">
              <h2 className="font-semibold text-lg mb-5">
                Customer Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User size={18} />
                  <div>
                    <p className="text-sm text-muted">Full Name</p>
                    <p>
                      {customer.firstName} {customer.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <div>
                    <p className="text-sm text-muted">Email</p>
                    <p>{customer.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <div>
                    <p className="text-sm text-muted">Phone</p>
                    <p>{customer.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={18} />
                  <div>
                    <p className="text-sm text-muted">Joined</p>
                    <p>{formatDate(new Date(customer.joined))}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Summary */}
            <div className="bg-card rounded-xl border border-border-color shadow p-6 text-primary">
              <h2 className="font-semibold text-lg mb-5">Account Summary</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Total Orders</span>
                  <span className="font-semibold">{customer.orders}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted">Total Spent</span>
                  <span className="font-semibold">
                    {currency} {customer?.totalSpent?.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted">Verified</span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      customer.isAccountVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.isAccountVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Manage Account */}
          <div className="bg-card rounded-xl border border-border-color shadow p-6 text-primary">
            <h2 className="font-semibold text-lg mb-6">Manage Account</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Role</label>

                <select
                  value={customer.role}
                  onChange={(e) =>
                    handleRoleChange(customer._id, e.target.value)
                  }
                  className="w-full border border-border-color rounded-lg p-3 text-primary bg-main outline-none"
                >
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Status</label>

                <select
                  value={customer.status}
                  onChange={(e) =>
                    handleStatusChange(customer._id, e.target.value)
                  }
                  className="w-full border rounded-lg p-3 text-primary bg-main outline-none border-border-color"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Deactivated">Deactivated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border-color shadow p-6">
            <h2 className="font-semibold text-lg mb-6 text-primary">
              Quick Actions
            </h2>

            <div className="flex flex-wrap gap-4">
              <button className="px-5 py-3 rounded-lg border border-border-color hover:bg-slate-700 text-primary transition-all">
                View Orders
              </button>

              <button
                onClick={handleResentVerificationEmail}
                className="px-5 py-3 rounded-lg border border-border-color hover:bg-slate-700 text-primary transition-all"
              >
                Resend Verification Email
              </button>

              <button
                onClick={handleSendResetPasswordOtp}
                className="px-5 py-3 rounded-lg border border-border-color text-primary hover:bg-slate-700 transition-all"
              >
                Resend Password Reset OTP
              </button>

              <button
                onClick={handleSuspendAccount}
                className="px-5 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Suspend Account
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerDetails;
