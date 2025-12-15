const nodemailer = require('nodemailer');
const functions = require('firebase-functions');

/**
 * Send Requirements Email to Solidev Electrosoft
 * @param {Object} data - Email data
 * @param {string} data.requirementsSummary - Final structured summary from AI
 * @param {Array} data.conversationHistory - Full conversation
 * @param {string} data.userEmail - User's email (optional)
 * @returns {Promise<Object>} - { messageId: string }
 */
async function sendRequirementsEmail({ requirementsSummary, conversationHistory = [], userEmail = '' }) {
  // Get email config from Firebase
  // Configure with: firebase functions:config:set email.user="your-email" email.pass="your-password"
  const emailUser = functions.config().email?.user;
  const emailPass = functions.config().email?.pass;

  if (!emailUser || !emailPass) {
    throw new Error('Email configuration missing. Run: firebase functions:config:set email.user="EMAIL" email.pass="PASSWORD"');
  }

  // Create transporter (using Gmail SMTP)
  // For production, consider using SendGrid, Mailgun, or similar
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass, // Use App Password for Gmail
    },
  });

  // Format conversation history
  const conversationText = conversationHistory
    .map((msg, idx) => {
      const role = msg.role === 'user' ? 'USER' : 'ASSISTANT';
      return `${idx + 1}. ${role}:\n${msg.content}\n`;
    })
    .join('\n');

  // Email content
  const emailSubject = 'New Project Requirements via AI Assistant';
  const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0085ff 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 20px; background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #0085ff; }
    .summary { white-space: pre-wrap; font-size: 14px; }
    .conversation { font-size: 12px; color: #666; background: #f5f5f5; padding: 10px; border-radius: 4px; max-height: 300px; overflow-y: auto; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🚀 New Project Requirements</h2>
      <p>AI Requirements Assistant</p>
    </div>
    <div class="content">
      <div class="section">
        <h3>📋 Requirements Summary</h3>
        <div class="summary">${requirementsSummary}</div>
      </div>

      ${userEmail ? `
      <div class="section">
        <h3>📧 User Contact</h3>
        <p><strong>Email:</strong> ${userEmail}</p>
      </div>
      ` : ''}

      <div class="section">
        <h3>💬 Full Conversation</h3>
        <div class="conversation">${conversationText || 'No conversation history'}</div>
      </div>

      <div class="section">
        <h3>⏰ Submission Details</h3>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Source:</strong> AI Project Requirements Assistant</p>
      </div>
    </div>
    <div class="footer">
      <p>Solidev Electrosoft Pvt. Ltd.</p>
      <p>Automated via Firebase Functions</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  // Send email
  const info = await transporter.sendMail({
    from: `"Solidev AI Assistant" <${emailUser}>`,
    to: 'davinder@solidevelectrosoft.com',
    subject: emailSubject,
    html: emailBody,
  });

  console.log('Email sent:', info.messageId);

  return {
    messageId: info.messageId,
    timestamp: new Date().toISOString(),
  };
}

module.exports = {
  sendRequirementsEmail,
};
