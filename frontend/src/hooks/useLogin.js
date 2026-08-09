import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login } from "../services/auth.service.js";

export const useLogin = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);

      await login(values);

      toast.success("Welcome back!");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
  };
};
