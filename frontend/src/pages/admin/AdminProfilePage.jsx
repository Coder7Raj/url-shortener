import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarDays,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  Save,
  Shield,
  User,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "../../store/auth.store.js";

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters"),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters"),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(100, "New password cannot exceed 100 characters"),

    confirmPassword: z.string().min(8, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const AdminProfilePage = () => {
  const { user, isLoading, getCurrentUser, updateProfile, changePassword } =
    useAuthStore();

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, [user, getCurrentUser]);

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name || "",
        username: user.username || "",
      });
    }
  }, [user, profileForm]);

  const handleProfileSubmit = async (data) => {
    const result = await updateProfile(data);

    if (result.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(result.message || "Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (data) => {
    const result = await changePassword(data);

    if (result.success) {
      toast.success("Password changed successfully");

      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      toast.error(result.message || "Failed to change password");
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-foreground">
        <h1 className="text-2xl font-bold tracking-tight">Admin Profile</h1>

        <p className="text-muted-foreground">
          Manage your administrator account and security settings.
        </p>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Overview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
              {user.name?.charAt(0)?.toUpperCase() ||
                user.username?.charAt(0)?.toUpperCase() ||
                "A"}
            </div>

            {/* Basic information */}
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user.name || "—"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">@{user.username || "—"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email || "—"}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <div className="mt-1 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />

                  <span className="font-medium">{user.role || "ADMIN"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
            className="space-y-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="name"
                    className="pl-9"
                    {...profileForm.register("name")}
                  />
                </div>

                {profileForm.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {profileForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="username"
                    className="pl-9"
                    {...profileForm.register("username")}
                  />
                </div>

                {profileForm.formState.errors.username && (
                  <p className="text-sm text-destructive">
                    {profileForm.formState.errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="email"
                    value={user.email || ""}
                    disabled
                    className="pl-9"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Email cannot be changed from the profile page.
                </p>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>

                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="role"
                    value={user.role || "ADMIN"}
                    disabled
                    className="pl-9"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Role can only be changed through admin user management.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />

                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Status</p>

                <p className="font-medium">
                  {user.is_active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Account Role</p>

                <p className="font-medium">{user.role || "ADMIN"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>

                <p className="font-medium">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
            className="max-w-2xl space-y-5"
          >
            {/* Current password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>

              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="currentPassword"
                  type="password"
                  className="pl-9"
                  {...passwordForm.register("currentPassword")}
                />
              </div>

              {passwordForm.formState.errors.currentPassword && (
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="newPassword"
                  type="password"
                  className="pl-9"
                  {...passwordForm.register("newPassword")}
                />
              </div>

              {passwordForm.formState.errors.newPassword && (
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-9"
                  {...passwordForm.register("confirmPassword")}
                />
              </div>

              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                <Lock className="mr-2 h-4 w-4" />

                {isLoading ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfilePage;
