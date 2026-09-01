import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import api from "../../api/axios";

const AdminLogin = () => {
  const { admin, setAdmin, setIsAdmin,navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const { data } = await api.post("/api/admin/login", {
        email,
        password,
      });


      if (data.success) {
        // setIsAdmin(true)
        setAdmin(true);
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      navigate("/admin");
    }
  }, [admin]);

  return (
    !admin && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex flex-col items-center justify-center text-sm text-primary"
      >
        <div className="flex flex-col gap-5 items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-border-color">
          <p className="text-2xl font-medium m-auto">
            <span className="text-accent">Admin</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="border border-border-color rounded w-full p-2 mt-1 outline-accent bg-card text-primary"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="border border-border-color rounded w-full p-2 mt-1 outline-accent bg-card text-primary"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-accent text-primary w-full py-2 rounded-md cursor-pointer transition-all flex justify-center items-center ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-dull"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 text-primary underline text-sm hover:text-primary/80 cursor-pointer"
        >
          Go to Home
        </button>
      </form>
    )
  );
};

export default AdminLogin;
