import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Brevo API configuration
const brevoApiKey = process.env.BREVO_API_KEY;
const brevoApiUrl = "https://api.brevo.com/v3/smtp/email";

// Test Brevo configuration
const testBrevo = async () => {
  try {
    if (!process.env.BREVO_API_KEY) {
      console.error("BREVO_API_KEY not found in environment variables");
      return;
    }
    console.log("Brevo is configured and ready to send emails (300/day limit)");
  } catch (error) {
    console.error("Brevo configuration error:", error);
  }
};

testBrevo();

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
    const response = await axios.post(
      brevoApiUrl,
      {
        sender: {
          name: "FastConnect",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: to,
          },
        ],
        subject: subject,
        htmlContent: html,
        textContent: text,
      },
      {
        headers: {
          "api-key": brevoApiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log(
      "✅ Email sent successfully via Brevo:",
      response.data.messageId
    );
    return { success: true, messageId: response.data.messageId };
  } catch (error) {
    console.error(
      "❌ Email send error:",
      error.response?.data || error.message
    );
    return { success: false, error: error.message };
  }
};

// For backward compatibility with existing code
export const transporter = {
  verify: (callback) => {
    testBrevo()
      .then(() => callback(null, true))
      .catch(callback);
  },
};
