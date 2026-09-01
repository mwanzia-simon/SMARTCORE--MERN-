import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const VerifyAccount = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your verification link...");
  const { token } = useParams();

  useEffect(() => {
    const verifyAccount = async () => {

      if (!token) {
        setStatus("error");
        setMessage("The verification link is invalid.");
        return;
      }

      try {
        const { data } = await api.post("/api/auth/verify-account", { token });

        if (data.success) {
          setStatus("success");
          setMessage(
            data.message || "Your account has been successfully verified.",
          );
        } else {
          setStatus("error");
          setMessage(data.message);
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "This verification link has expired or is no longer valid.",
        );
      }
    };

    verifyAccount();
  }, [token]);

  return (
    <div className="min-h-screen bg-main flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-xl bg-card border border-border-color shadow-2xl p-8 text-center">
        {/* Loading */}
        {status === "loading" && (
          <>
            <div className="flex justify-center mb-6">
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            </div>

            <h1 className="text-3xl font-bold text-white">Verifying Account</h1>

            <p className="mt-4 text-gray-400">{message}</p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="bg-green-500/10 p-5 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white">Account Verified</h1>

            {/* <p className="mt-4 text-gray-400 leading-7">
              {message}
            </p> */}

            <p className="mt-3 text-sm text-gray-500">
              Your SmartCore account has been succesifully verified. You can now
              continue shopping where you left off.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition px-6 py-3 text-white font-semibold"
            >
              continue shoping
              <ArrowRight size={18} />
            </Link>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="bg-red-500/10 p-5 rounded-full">
                <AlertCircle className="w-16 h-16 text-red-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-secondary">
              Verification Failed
            </h1>

            {/* <p className="mt-4 text-gray-400 leading-7">
              {message}
            </p> */}

            <p className="mt-3 text-sm text-muted">
              The link may have expired, been used already, or your account may
              have been permanently deleted.
            </p>

            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Link
                to="/profile"
                className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white transition"
              >
                Back to Profile
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition"
              >
                Contact Support
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;
