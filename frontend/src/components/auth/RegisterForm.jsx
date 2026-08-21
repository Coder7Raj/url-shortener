import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ROUTES } from "../../constants/routes.js";
import useAuth from "../../hooks/useAuth.js";
import { registerSchema } from "../../schemas/register.schema.js";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { register: registerUser, isLoading, error, clearError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    const registerData = {
      username: values.username,
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const result = await registerUser(registerData);

    if (result.success) {
      if (result.data?.accessToken) {
        navigate(ROUTES.DASHBOARD, {
          replace: true,
        });

        return;
      }

      navigate(ROUTES.HOME, {
        replace: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>

        <Input
          id="username"
          type="text"
          placeholder="yourusername"
          autoComplete="username"
          disabled={isLoading}
          {...register("username", {
            onChange: () => clearError(),
          })}
        />

        {errors.username && (
          <p className="text-sm text-destructive">{errors.username.message}</p>
        )}
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          disabled={isLoading}
          {...register("name", {
            onChange: () => clearError(),
          })}
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          disabled={isLoading}
          {...register("email", {
            onChange: () => clearError(),
          })}
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          disabled={isLoading}
          {...register("password", {
            onChange: () => clearError(),
          })}
        />

        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>

        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          disabled={isLoading}
          {...register("confirmPassword", {
            onChange: () => clearError(),
          })}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
