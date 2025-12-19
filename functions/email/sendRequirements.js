const { EmailClient } = require('@azure/communication-email');
const functions = require('firebase-functions');
const { generateRequirementsPDF } = require('../pdf/requirementsPdf');

// Admin email configuration
const ADMIN_EMAIL = 'davinder@solidevelectrosoft.com';
const ADMIN_NAME = 'Davinder Pal';

/**
 * Send Requirements Email to Solidev Electrosoft using Azure Communication Services
 * @param {Object} data - Email data
 * @param {string} data.requirementsSummary - Final structured summary from AI
 * @param {Array} data.conversationHistory - Full conversation
 * @param {string} data.userEmail - User's email (optional)
 * @param {string} data.selectedStage - Selected MVP stage (optional)
 * @returns {Promise<Object>} - { messageId: string, adminMessageId: string }
 */
async function sendRequirementsEmail({
  requirementsSummary,
  conversationHistory = [],
  userEmail = '',
  selectedStage = 'Custom Project',
}) {
  // Get Azure Communication Services connection string from Firebase config
  const connectionString = functions.config().azure?.email?.connection_string;

  if (!connectionString) {
    throw new Error('Azure Communication Services configuration missing. Run: firebase functions:config:set azure.email.connection_string="YOUR_CONNECTION_STRING"');
  }

  // Create Azure Email client
  const emailClient = new EmailClient(connectionString);

  // Generate PDF from requirements
  console.log('Generating PDF for requirements...');
  const pdfBuffer = await generateRequirementsPDF({
    requirementsSummary,
    conversationHistory,
    userEmail,
    selectedStage,
  });

  // Convert PDF buffer to base64 for email attachment
  const pdfBase64 = pdfBuffer.toString('base64');
  const pdfFileName = `Requirements_${new Date().getTime()}.pdf`;

  // Format conversation history for email body
  const conversationText = conversationHistory
    .map((msg, idx) => {
      const role = msg.role === 'user' ? 'USER' : 'ASSISTANT';
      return `${idx + 1}. ${role}:\n${msg.content}\n`;
    })
    .join('\n');

  // Email content (HTML body)
  const emailSubject = `New Project Requirements - ${selectedStage}`;
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
    .stage { font-size: 16px; font-weight: bold; color: #0085ff; margin: 10px 0; }
    .summary { white-space: pre-wrap; font-size: 14px; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
    .note { background: #fff3cd; padding: 10px; border-radius: 4px; margin: 10px 0; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🚀 New Project Requirements</h2>
      <p>AI Requirements Assistant - Solidev Electrosoft</p>
    </div>
    <div class="content">
      <div class="section">
        <h3>📌 Project Stage</h3>
        <div class="stage">${selectedStage}</div>
      </div>

      ${userEmail ? `
      <div class="section">
        <h3>📧 User Contact</h3>
        <p><strong>Email:</strong> ${userEmail}</p>
      </div>
      ` : ''}

      <div class="section">
        <h3>Requirements Summary</h3>
        <div class="summary">${(requirementsSummary || 'No summary provided')
          .split('\n\n')
          .map((paragraph) => `<p style="margin: 12px 0; line-height: 1.6;">${paragraph.replace(/\n/g, '<br>')}</p>`)
          .join('')}</div>
      </div>

      <div class="section">
        <h3>📎 PDF Document</h3>
        <p>A formatted PDF with complete requirements and conversation history is attached to this email.</p>
      </div>

      <div class="section">
        <h3>⏰ Submission Details</h3>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Source:</strong> AI Project Requirements Assistant</p>
      </div>

      <div class="note">
        <strong>Note:</strong> The complete conversation history and requirements summary have been saved in the attached PDF for your reference.
      </div>
    </div>
    <div class="footer">
      <p>Solidev Electrosoft Pvt. Ltd.</p>
      <p>Powered by Azure Communication Services & AI Assistant</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  // Prepare email recipients
  const recipients = [];

  // Always send to admin
  recipients.push({
    address: ADMIN_EMAIL,
    displayName: ADMIN_NAME,
  });

  // Send to user if email provided
  if (userEmail && userEmail !== 'Not provided') {
    recipients.push({
      address: userEmail,
      displayName: 'User',
    });
  }

  // Configure email message with PDF attachment for Azure Communication Services
  const message = {
    senderAddress: 'admin@solidevelectrosoft.com',
    content: {
      subject: emailSubject,
      html: emailBody,
    },
    recipients: {
      to: recipients,
    },
    attachments: [
      {
        name: pdfFileName,
        contentType: 'application/pdf',
        contentInBase64: pdfBase64,
      },
    ],
  };

  // Send email using Azure Communication Services
  console.log(`Sending requirements email to ${recipients.length} recipient(s)...`);
  const poller = await emailClient.beginSend(message);
  const result = await poller.pollUntilDone();

  console.log('Azure Email with PDF attachment sent:', result.id);

  return {
    messageId: result.id,
    timestamp: new Date().toISOString(),
    recipientCount: recipients.length,
    adminEmail: ADMIN_EMAIL,
    userEmail: userEmail && userEmail !== 'Not provided' ? userEmail : null,
  };
}

module.exports = {
  sendRequirementsEmail,
};
