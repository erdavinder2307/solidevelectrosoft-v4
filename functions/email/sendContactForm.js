const { EmailClient } = require('@azure/communication-email');
const functions = require('firebase-functions');

/**
 * Send Contact Form Email to Solidev Electrosoft using Azure Communication Services
 * @param {Object} data - Form data
 * @param {string} data.name - User's name
 * @param {string} data.email - User's email
 * @param {string} data.phone - User's phone
 * @param {string} data.projectType - Type of project
 * @param {string} data.budget - Budget range
 * @param {string} data.message - Project details message
 * @returns {Promise<Object>} - { messageId: string }
 */
async function sendContactFormEmail({ name, email, phone, projectType, budget, message }) {
  // Get Azure Communication Services connection string from Firebase config
  const connectionString = functions.config().azure?.email?.connection_string;

  if (!connectionString) {
    throw new Error('Azure Communication Services configuration missing. Run: firebase functions:config:set azure.email.connection_string="YOUR_CONNECTION_STRING"');
  }

  // Create Azure Email client
  const emailClient = new EmailClient(connectionString);

  // Format project type display
  const projectTypeMap = {
    'web-app': 'Web Application',
    'mobile-app': 'Mobile Application',
    'ai-solution': 'AI/ML Solution',
    'mvp': 'MVP Development',
    'other': 'Other',
  };

  const budgetMap = {
    'under-5k': 'Under $5,000',
    '5k-10k': '$5,000 - $10,000',
    '10k-25k': '$10,000 - $25,000',
    '25k-50k': '$25,000 - $50,000',
    'over-50k': 'Over $50,000',
    'not-sure': 'Not sure yet',
  };

  // Email content
  const emailSubject = `New Contact Form Submission from ${name}`;
  const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%); color: white; padding: 24px; border-radius: 8px 8px 0 0; }
    .header h2 { margin: 0; font-size: 24px; }
    .header p { margin: 8px 0 0 0; opacity: 0.9; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 20px; background: white; padding: 16px; border-radius: 6px; border-left: 4px solid #3b82f6; }
    .section-title { font-weight: 600; color: #3b82f6; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .field { margin-bottom: 12px; }
    .field-label { font-weight: 600; color: #1f2937; font-size: 13px; }
    .field-value { color: #4b5563; margin-top: 4px; word-break: break-word; }
    .message-box { white-space: pre-wrap; background: #f3f4f6; padding: 12px; border-radius: 4px; border-left: 3px solid #3b82f6; font-size: 13px; line-height: 1.5; }
    .footer { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
    .cta-section { background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%); padding: 16px; border-radius: 6px; border: 1px solid #dbeafe; }
    .cta-text { margin: 0; font-size: 13px; color: #1e40af; font-weight: 500; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📋 New Contact Form Submission</h2>
      <p>Website: https://www.solidevelectrosoft.com</p>
    </div>
    <div class="content">
      <!-- Contact Information Section -->
      <div class="section">
        <div class="section-title">👤 Contact Information</div>
        <div class="field">
          <div class="field-label">Name</div>
          <div class="field-value">${name}</div>
        </div>
        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></div>
        </div>
        ${phone ? `
        <div class="field">
          <div class="field-label">Phone</div>
          <div class="field-value"><a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a></div>
        </div>
        ` : ''}
      </div>

      <!-- Project Details Section -->
      <div class="section">
        <div class="section-title">🎯 Project Details</div>
        <div class="field">
          <div class="field-label">Project Type</div>
          <div class="field-value">${projectTypeMap[projectType] || projectType || 'Not specified'}</div>
        </div>
        ${budget ? `
        <div class="field">
          <div class="field-label">Budget Range</div>
          <div class="field-value">${budgetMap[budget] || budget}</div>
        </div>
        ` : ''}
      </div>

      <!-- Message Section -->
      <div class="section">
        <div class="section-title">💬 Project Details</div>
        <div class="message-box">${message}</div>
      </div>

      <!-- CTA Section -->
      <div class="cta-section">
        <p class="cta-text">⏰ Response target: Within 24 hours</p>
      </div>

      <!-- Submission Details -->
      <div class="section" style="background: #f3f4f6; border-left: none; font-size: 12px;">
        <div style="color: #6b7280;">
          <strong>Submission Date:</strong> ${new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })} IST
        </div>
        <div style="color: #6b7280; margin-top: 4px;">
          <strong>Source:</strong> Contact Form (https://www.solidevelectrosoft.com/contact)
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Solidev Electrosoft Pvt. Ltd.</p>
      <p>Custom Software Development Solutions</p>
      <p>Powered by Azure Communication Services</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  // Configure email message for Azure Communication Services
  const emailMessage = {
    senderAddress: 'admin@solidevelectrosoft.com',
    content: {
      subject: emailSubject,
      html: emailBody,
    },
    recipients: {
      to: [
        { address: 'admin@solidevelectrosoft.com', displayName: 'Solidev Admin' }
      ],
    },
  };

  // Send email using Azure Communication Services
  const poller = await emailClient.beginSend(emailMessage);
  const result = await poller.pollUntilDone();

  console.log('Contact form email sent via Azure:', result.id);

  return {
    messageId: result.id,
    timestamp: new Date().toISOString(),
  };
}

module.exports = {
  sendContactFormEmail,
};
