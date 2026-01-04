import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Mail, RefreshCw } from "lucide-react";
import useAuthStore from "../../store/authStore";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/constants";

export default function VerifyEmail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { verifyOTP, resendOTP, error, clearError } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    }
  }, [user, navigate]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    clearError();
    setLocalError("");

    if (!otp) {
      setLocalError("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      setLocalError("OTP must be 6 digits");
      return;
    }

    if (!/^\d+$/.test(otp)) {
      setLocalError("OTP must contain only numbers");
      return;
    }

    setLoading(true);

    const result = await verifyOTP(otp);

    setLoading(false);

    if (result.success) {
      setSuccess(true);

      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 1500);
    } else {
      setOtp(""); // Clear input on error
    }
  };

  const handleResendOTP = async () => {
    clearError();
    setLocalError("");
    setResending(true);

    const result = await resendOTP();

    setResending(false);

    if (result.success) {
      setResendTimer(120);
      setCanResend(false);

      setLocalError("");
      alert("New OTP sent to your email!");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setLocalError("");
      clearError();
    }
  };

  if (!user) {
    return null;
  }

  const displayError = localError || error;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.gradients.background,
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 3,
            textAlign: "center",
            boxShadow: theme.shadows[20],
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: theme.palette.gradients.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: theme.shadows[8],
            }}
          >
            <Mail size={40} color="white" />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: theme.palette.text.primary,
            }}
          >
            Verify Your Email
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 0.5,
            }}
          >
            We sent a 6-digit code to
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              mb: 4,
            }}
          >
            {user.email}
          </Typography>

          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 3,
                borderRadius: 2,
              }}
            >
              Email verified successfully! Redirecting...
            </Alert>
          )}

          {displayError && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
              }}
            >
              {displayError}
            </Alert>
          )}

          {/* OTP Form */}
          {!success && (
            <Box component="form" onSubmit={handleVerify}>
              <Box
                sx={{
                  maxWidth: 400,
                  mx: "auto",
                  mb: 3,
                }}
              >
                <TextField
                  fullWidth
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="000000"
                  inputProps={{
                    maxLength: 6,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    style: {
                      fontSize: "32px",
                      fontWeight: 600,
                      letterSpacing: "10px",
                      textAlign: "center",
                      padding: "16px",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: theme.palette.background.default,
                      border: `2px solid ${theme.palette.divider}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: theme.palette.background.paper,
                      },
                      "&.Mui-focused": {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: `0 0 0 4px ${theme.palette.primary.main}20`,
                      },
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                  autoFocus
                  disabled={loading || resending}
                />

                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    color: theme.palette.text.secondary,
                    mt: 1.5,
                    fontSize: "0.85rem",
                  }}
                >
                  Enter the 6-digit code from your email
                </Typography>
              </Box>

              <Box
                sx={{
                  maxWidth: 400,
                  mx: "auto",
                  mb: 3,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading || resending || otp.length !== 6}
                  sx={{
                    py: 1.5,
                    fontSize: "16px",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                    background: theme.palette.gradients.primary,
                    boxShadow: theme.shadows[4],
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: theme.palette.gradients.primary,
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[8],
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                    "&.Mui-disabled": {
                      background: theme.palette.action.disabledBackground,
                      color: theme.palette.action.disabled,
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Verify Email"
                  )}
                </Button>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 1,
                  fontSize: "0.95rem",
                }}
              >
                Didn't receive the code?
              </Typography>

              {canResend ? (
                <Button
                  onClick={handleResendOTP}
                  disabled={resending || loading}
                  startIcon={resending ? null : <RefreshCw size={16} />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: theme.palette.primary.main,
                    "&:hover": {
                      background: `${theme.palette.primary.main}10`,
                    },
                  }}
                >
                  {resending ? <CircularProgress size={20} /> : "Resend OTP"}
                </Button>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                >
                  Resend OTP in{" "}
                  <Box
                    component="span"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                    }}
                  >
                    {formatTimer(resendTimer)}
                  </Box>
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
