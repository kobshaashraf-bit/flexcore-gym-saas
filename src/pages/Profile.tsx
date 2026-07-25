import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Camera, KeyRound, Mail, Phone, ShieldCheck, User } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils";
import {
  profileSchema,
  passwordSchema,
  type ProfileFormValues,
  type PasswordFormValues,
} from "@/schemas/moduleSchemas";

const roleLabels: Record<string, string> = {
  admin: "Administrator",
  receptionist: "Receptionist",
  trainer: "Trainer",
};

export default function Profile() {
  const { user } = useAuth();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: profileSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: "",
      bio: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: passwordSubmitting },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onProfileSubmit = () => {
    toast.success("Profile updated");
  };

  const onPasswordSubmit = () => {
    toast.success("Password changed successfully");
    resetPassword();
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Manage your personal account details and security." />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-1">
          <Card className="surface-card">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.photoURL} alt={user.name} />
                  <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-glow transition-transform hover:scale-105">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-4 font-display text-lg font-bold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge className="mt-3 gap-1">
                <ShieldCheck className="h-3 w-3" /> {roleLabels[user.role]}
              </Badge>
              {user.gymName && (
                <>
                  <Separator className="my-5" />
                  <div className="w-full space-y-2 text-left text-sm">
                    <p className="text-xs text-muted-foreground">Gym / Studio</p>
                    <p className="font-medium">{user.gymName}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <KeyRound className="h-4 w-4 text-primary" /> Change password
              </CardTitle>
              <CardDescription>Use a strong password you don't reuse elsewhere.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    error={!!passwordErrors.currentPassword}
                    {...registerPassword("currentPassword")}
                  />
                  {passwordErrors.currentPassword && (
                    <p className="text-xs text-destructive">{passwordErrors.currentPassword.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    autoComplete="new-password"
                    error={!!passwordErrors.newPassword}
                    {...registerPassword("newPassword")}
                  />
                  {passwordErrors.newPassword && (
                    <p className="text-xs text-destructive">{passwordErrors.newPassword.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    error={!!passwordErrors.confirmPassword}
                    {...registerPassword("confirmPassword")}
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="text-xs text-destructive">{passwordErrors.confirmPassword.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={passwordSubmitting}>
                  {passwordSubmitting ? "Updating…" : "Update password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 xl:col-span-2">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-primary" /> Personal details
              </CardTitle>
              <CardDescription>This information is visible to other staff members.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="profileName">Full name</Label>
                    <Input id="profileName" autoComplete="name" error={!!profileErrors.name} {...registerProfile("name")} />
                    {profileErrors.name && <p className="text-xs text-destructive">{profileErrors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profileEmail">Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="profileEmail"
                        type="email"
                        className="pl-10"
                        autoComplete="email"
                        error={!!profileErrors.email}
                        {...registerProfile("email")}
                      />
                    </div>
                    {profileErrors.email && <p className="text-xs text-destructive">{profileErrors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profilePhone">Phone</Label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="profilePhone" className="pl-10" autoComplete="tel" placeholder="+92 300 1234567" {...registerProfile("phone")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell your team a little about yourself…"
                    error={!!profileErrors.bio}
                    {...registerProfile("bio")}
                  />
                  {profileErrors.bio && <p className="text-xs text-destructive">{profileErrors.bio.message}</p>}
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={profileSubmitting}>
                    {profileSubmitting ? "Saving…" : "Save changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}
