import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail", // (handles host/port automatically)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    console.log(" Email server is working");
  }
});

export const emailTemplates = {
  sendOTP: (otp, expiryMinutes = 5) => ({
    subject: "Your FastConnect Verification Code",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: #0d9488;
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .otp-code {
              background: white;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              text-align: center;
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
              border: 2px dashed #047857;
              color: #047857;
            }
            .warning {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 12px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 FastConnect</h1>
            </div>
            <div class="content">
              <h2>Verification Code</h2>
              <p>Hello,</p>
              <p>You requested to login to your FastConnect account. Use the verification code below:</p>
              
              <div class="otp-code">${otp}</div>
              
              <p style="text-align: center; color: #666;">
                This code will expire in <strong>${expiryMinutes} minutes</strong>.
              </p>
              
              <div class="warning">
                ⚠️ <strong>Security Notice:</strong> If you didn't request this code, please ignore this email or contact support if you're concerned about your account security.
              </div>
              
              <p>Best regards,<br>The FastConnect Team</p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
              <p>&copy; 2026 FastConnect. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Your FastConnect Verification Code

Your verification code is: ${otp}

This code will expire in ${expiryMinutes} minutes.

If you didn't request this code, please ignore this email.

Best regards,
FastConnect Team
    `,
  }),
};

export const sendEmail = async (to, subject, html, text) => {
  try {
    const info = await transporter.sendMail({
      from:
        process.env.EMAIL_FROM || `"FastConnect" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    });

    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error.message };
  }
};
