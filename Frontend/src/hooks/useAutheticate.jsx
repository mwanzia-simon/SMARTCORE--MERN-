import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export const useAutheticate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {  getUserData } = useAppContext();

  const autheticateUser = async (url, userData) => {
    setLoading(true);
    try {
      const { data } = await api.post(url, userData);

      if (data.success) {
        // toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { autheticateUser, loading, error, setError };
};
