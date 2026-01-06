import { sendEmail } from "../config/email.js";

const notificationEmailTemplates = {
  new_post: (data) => ({
    subject: `New question posted: "${data.postTitle}"`,
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
              background: #047857;
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
            .post-preview {
              background: white;
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
              border-left: 4px solid #0d9488;
            }
            .post-title {
              font-size: 18px;
              font-weight: bold;
              color: #0d9488;
              margin-bottom: 10px;
            }
            .post-body {
              color: #666;
              line-height: 1.6;
            }
            .cta-button {
              display: inline-block;
              background: #047857;
              color: white;
              padding: 14px 32px;
              text-decoration: none;
              border-radius: 8px;
              margin: 20px 0;
              font-weight: bold;
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
              <h1>🎓 New Question on FastConnect</h1>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p><strong>${data.actorName}</strong> posted a new question that might interest you:</p>
              
              <div class="post-preview">
                <div class="post-title">${data.postTitle}</div>
                <div class="post-body">${data.postPreview}</div>
              </div>
              
              <center>
                <a href="${data.postUrl}" class="cta-button">View Question & Reply</a>
              </center>
              
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                As an alumni, your insights can help current students navigate their career paths.
              </p>
            </div>
            <div class="footer">
              <p>This is an automated email from FastConnect.</p>
              <p>&copy; 2026 FastConnect. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Question on FastConnect

${data.actorName} posted a new question:

"${data.postTitle}"

${data.postPreview}

View and reply: ${data.postUrl}

---
FastConnect - Connecting FAST-NUCES students with alumni
    `,
  }),

  post_reply: (data) => ({
    subject: `${data.actorName} replied to your post`,
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
              background: #047857;
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
            .reply-preview {
              background: white;
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
              border-left: 4px solid #0d9488;
            }
            .your-post {
              background: #e0f2f1;
              padding: 15px;
              margin: 15px 0;
              border-radius: 6px;
              font-size: 14px;
            }
            .cta-button {
              display: inline-block;
              background: #047857
              color: white;
              padding: 14px 32px;
              text-decoration: none;
              border-radius: 8px;
              margin: 20px 0;
              font-weight: bold;
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
              <h1>New Reply to Your Post</h1>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p><strong>${data.actorName}</strong> replied to your post:</p>
              
              <div class="your-post">
                <strong>Your post:</strong> "${data.postTitle}"
              </div>
              
              <div class="reply-preview">
                ${data.replyPreview}
              </div>
              
              <center>
                <a href="${data.postUrl}" class="cta-button">View Full Reply</a>
              </center>
            </div>
            <div class="footer">
              <p>This is an automated email from FastConnect.</p>
              <p>&copy; 2026 FastConnect. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Reply to Your Post

${data.actorName} replied to your post "${data.postTitle}":

${data.replyPreview}

View full reply: ${data.postUrl}

---
FastConnect - Connecting FAST-NUCES students with alumni
    `,
  }),
};

export const sendNotificationEmail = async (notification) => {
  try {
    const { type, metadata, recipient } = notification;

    if (!recipient || !recipient.email) {
      throw new Error("Recipient email not found");
    }

    const templateData = {
      actorName: metadata.actorName || "Someone",
      postTitle: metadata.postTitle || "Untitled Post",
      postPreview: metadata.postPreview
        ? metadata.postPreview.substring(0, 200) + "..."
        : "",
      replyPreview: metadata.replyPreview
        ? metadata.replyPreview.substring(0, 300) + "..."
        : "",
      postUrl: `${process.env.FRONTEND_URL || "http://localhost:5173"}/posts/${
        metadata.postUuid
      }`,
    };

    let emailTemplate;
    if (type === "new_post") {
      emailTemplate = notificationEmailTemplates.new_post(templateData);
    } else if (type === "post_reply") {
      emailTemplate = notificationEmailTemplates.post_reply(templateData);
    } else {
      // No email for other types (like post_like)
      return { success: false, reason: "No email template for this type" };
    }

    const result = await sendEmail(
      recipient.email,
      emailTemplate.subject,
      emailTemplate.html,
      emailTemplate.text
    );

    if (result.success) {
      console.log(`Sent ${type} notification email to ${recipient.email}`);
    }

    return result;
  } catch (error) {
    console.error("Error sending notification email:", error);
    return { success: false, error: error.message };
  }
};

// export const sendNotificationEmail = async (notification) => {
//   return { success: true, reason: "Email sending is currently disabled" };
// };
