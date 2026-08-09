import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ROUTES } from "../../constants/routes.js";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const { username, name, email, password, confirmPassword } = formData;

    if (!username || !name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            name,
            email,
            password,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed.");
      }

      /*
       * If your backend automatically logs the user in
       * after registration, store the tokens.
       */

      if (result.data?.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
      }

      if (result.data?.refreshToken) {
        localStorage.setItem("refreshToken", result.data.refreshToken);
      }

      if (result.data?.user) {
        localStorage.setItem("user", JSON.stringify(result.data.user));

        navigate(ROUTES.DASHBOARD, {
          replace: true,
        });

        return;
      }

      /*
       * If registration does NOT automatically log the user in,
       * send them to login instead.
       */

      navigate(ROUTES.LOGIN, {
        replace: true,
      });
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>

        <Input
          id="username"
          name="username"
          type="text"
          placeholder="yourusername"
          value={formData.username}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
