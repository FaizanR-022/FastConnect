import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  KeyRound,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ROUTES } from "../../constants/constants";
import authService from "../../services/authService";
import { toast } from "sonner";

const getPasswordStrength = (password) => {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1)
    return { label: "Weak", color: "bg-destructive", width: "w-1/3" };
  if (score <= 3)
    return { label: "Medium", color: "bg-yellow-500", width: "w-2/3" };
  return { label: "Strong", color: "bg-green-500", width: "w-full" };
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // sessionStorage fallback so page refresh doesn't lose email
  const [email, setEmail] = useState(
    location.state?.email || sessionStorage.getItem("resetEmail") || "",
  );
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleOtpChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= 6) {
      setOtp(val);
      setError("");
    }
  };

  const handleResend = async () => {
    if (!email.trim()) {
      setError("Please enter your email address first.");
      return;
    }
    try {
      setResending(true);
      setError("");
      await authService.resendResetOTP(email.trim());
      setResendTimer(60);
      setCanResend(false);
      toast.success("New reset code sent!");
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (otp.length !== 6) {
      setError("Please enter the 6-digit reset code.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await authService.resetPassword({
        email: email.trim(),
        otp,
        newPassword,
      });
      sessionStorage.removeItem("resetEmail");
      setSuccess(true);
      toast.success("Password reset successfully!");
      setTimeout(() => navigate(ROUTES.LOGIN), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(newPassword);

  if (success) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-8 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Password Reset!</h1>
            <p className="text-muted-foreground mb-6">
              Your password has been updated. Redirecting to login...
            </p>
            <Button className="w-full" onClick={() => navigate(ROUTES.LOGIN)}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-8 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter the code from your email and choose a new password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                disabled={loading}
              />
            </div>

            {/* OTP + resend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="otp">Reset Code</Label>
                {canResend ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-primary gap-1"
                    onClick={handleResend}
                    disabled={resending}
                  >
                    {resending ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <RefreshCw className="w-3 h-3" />
                    )}
                    Resend code
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Resend in{" "}
                    <span className="text-primary font-medium">
                      {resendTimer}s
                    </span>
                  </span>
                )}
              </div>
              <Input
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="000000"
                maxLength={6}
                inputMode="numeric"
                className="text-center text-2xl font-semibold tracking-widest h-12"
                disabled={loading}
                autoFocus={!!email}
              />
            </div>

            {/* New Password + strength indicator */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {strength && (
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`}
                    />
                  </div>
                  <p
                    className={`text-xs ${
                      strength.label === "Weak"
                        ? "text-destructive"
                        : strength.label === "Medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {strength.label} password
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your new password"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || otp.length !== 6}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {loading ? "Resetting..." : "Reset Password"}
            </Button>

            <div className="text-center">
              <Link
                to={ROUTES.LOGIN}
                className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
