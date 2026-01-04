import { OTP } from "../models/index.js";
import { sendEmail, emailTemplates } from "../config/email.js";
import { Op } from "sequelize";

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createAndSendOTP = async (user) => {
  const otp_code = generateOTP();
  const expiryMinutes = 5;
  const expires_at = new Date(Date.now() + expiryMinutes * 60 * 1000);

  // Delete any existing OTPs for curr user
  await OTP.destroy({
    where: { user_id: user.user_id },
  });

  await OTP.create({
    user_id: user.user_id,
    otp_code,
    expires_at,
  });

  const template = emailTemplates.sendOTP(otp_code, expiryMinutes);
  const emailResult = await sendEmail(
    user.email,
    template.subject,
    template.html,
    template.text
  );

  return {
    success: emailResult.success,
    expiresAt: expires_at,
  };
};

export const verifyOTP = async (user_id, otp_code) => {
  const otpRecord = await OTP.findOne({
    where: {
      user_id,
      otp_code,
      is_used: false,
      expires_at: {
        [Op.gt]: new Date(), // Not expired
      },
    },
  });

  if (!otpRecord) {
    const expiredOTP = await OTP.findOne({
      where: { user_id, otp_code },
    });

    if (expiredOTP) {
      if (expiredOTP.is_used) {
        return { valid: false, reason: "OTP already used" };
      }
      if (expiredOTP.expires_at < new Date()) {
        return { valid: false, reason: "OTP expired" };
      }
    }

    await OTP.increment("attempts", {
      where: { user_id },
    });

    return { valid: false, reason: "Invalid OTP" };
  }

  await otpRecord.update({ is_used: true });

  await OTP.destroy({
    where: { user_id },
  });

  return { valid: true };
};

export const checkOTPAttempts = async (user_id) => {
  const recentOTP = await OTP.findOne({
    where: {
      user_id,
      createdAt: {
        [Op.gt]: new Date(Date.now() - 15 * 60 * 1000), // Last 15 minutes
      },
    },
    order: [["createdAt", "DESC"]],
  });

  if (recentOTP && recentOTP.attempts >= 5) {
    return {
      locked: true,
      message: "Too many failed attempts. Please try again in 15 minutes.",
    };
  }

  return { locked: false };
};

export const cleanupExpiredOTPs = async () => {
  const deleted = await OTP.destroy({
    where: {
      expires_at: {
        [Op.lt]: new Date(),
      },
    },
  });

  return deleted;
};
