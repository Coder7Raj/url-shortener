import {
  CalendarDays,
  CheckCircle2,
  Edit,
  KeyRound,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useProfile from "../../hooks/useProfile.js";

const ProfilePage = () => {
  const {
    profile,
    isLoading,
    isUpdating,
    isChangingPassword,
    fetchProfile,
    updateProfile,
    changePassword,
  } = useProfile();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (!profile) return;

    setName(profile.name || "");
    setUsername(profile.username || "");
    setProfilePicture(profile.profilePicture || "");
  }, [profile]);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const result = await updateProfile({
      name,
      username,
      profilePicture: profilePicture.trim() || null,
    });

    if (result.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(result.message);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await changePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (result.success) {
      toast.success("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(result.message);
    }
  };

  if (isLoading && !profile) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-muted-foreground">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

        <p className="text-muted-foreground">
          Manage your account information and security.
        </p>
      </div>

      {/* Profile overview */}

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{profile.name}</h2>

              <p className="text-sm text-muted-foreground">
                @{profile.username}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {profile.role}
                </span>

                {profile.emailVerified && (
                  <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account information */}

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-sm font-medium">Email</p>

              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-sm font-medium">Account status</p>

              <p className="text-sm text-muted-foreground">
                {profile.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays className="mt-1 h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-sm font-medium">Joined</p>

              <p className="text-sm text-muted-foreground">
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays className="mt-1 h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-sm font-medium">Last updated</p>

              <p className="text-sm text-muted-foreground">
                {new Date(profile.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit profile */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Profile
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>

                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>

                <Input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile picture URL</Label>

              <Input
                id="profilePicture"
                type="url"
                placeholder="https://..."
                value={profilePicture}
                onChange={(event) => setProfilePicture(event.target.value)}
              />
            </div>

            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change password */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Change Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleChangePassword} className="max-w-xl space-y-5">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current password</Label>

              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>

              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm new password</Label>

              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
