import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { getRemainingDays } from "../lib/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

const AccountDeleted = () => {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);

  // Function to activate account
  const handleActivateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/auth/activate-account");

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-main flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-xl bg-card border border-border-color shadow-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/10 p-5 rounded-full">
            <AlertCircle className="w-16 h-16 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-secondary">
          Account deactivated
        </h1>
        <p className="mt-3 text-sm text-muted">
          Your account is scheduled to be deleted withing{" "}
          {user ? getRemainingDays(user) : ""} day(s) . If you wish to
          reactivate it click the button below!
        </p>

        <button
          onClick={handleActivateAccount}
          className="w-full mt-3 px-4 py-2.5 bg-accent text-primary rounded-lg hover:bg-accent-hover transition-all disabled:bg-gray-500"
          disabled={loading}
        >
          {loading ? "Sending Activation Link ...." : "Activate Account"}
        </button>
      </div>
    </div>
  );
};

export default AccountDeleted;
