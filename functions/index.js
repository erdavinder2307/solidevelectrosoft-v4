const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const { callClaudeAI } = require('./ai/claudeHandler');
const { sendRequirementsEmail } = require('./email/sendRequirements');
const { sendContactFormEmail } = require('./email/sendContactForm');

// Initialize Firebase Admin
admin.initializeApp();

/**
 * Firebase Function: AI Chat Request
 * Endpoint: /api/ai-request
 * Calls Claude Sonnet API with strict requirements-gathering prompt
 */
exports.aiRequest = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Only allow POST
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { userMessage, conversationHistory = [] } = req.body;

      if (!userMessage) {
        return res.status(400).json({ error: 'userMessage is required' });
      }

      // Call Claude AI handler
      const aiResponse = await callClaudeAI(userMessage, conversationHistory);

      return res.status(200).json({
        success: true,
        response: aiResponse,
      });
    } catch (error) {
      console.error('AI Request Error:', error);
      return res.status(500).json({
        error: 'Failed to process AI request',
        message: error.message,
      });
    }
  });
});

/**
 * Firebase Function: Send Requirements Email
 * Endpoint: /api/send-requirements
 * Sends final project requirements to Solidev email
 */
exports.sendRequirements = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Only allow POST
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { requirementsSummary, conversationHistory, userEmail } = req.body;

      if (!requirementsSummary) {
        return res.status(400).json({ error: 'requirementsSummary is required' });
      }

      // Send email
      const emailResult = await sendRequirementsEmail({
        requirementsSummary,
        conversationHistory,
        userEmail,
      });

      return res.status(200).json({
        success: true,
        message: 'Requirements sent successfully',
        messageId: emailResult.messageId,
      });
    } catch (error) {
      console.error('Send Requirements Error:', error);
      return res.status(500).json({
        error: 'Failed to send requirements',
        message: error.message,
      });
    }
  });
});

/**
 * Firebase Function: Send Contact Form
 * Endpoint: /api/send-contact-form
 * Sends contact form submissions to Solidev admin email
 */
exports.sendContactForm = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Only allow POST
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { name, email, phone, projectType, budget, message } = req.body;

      // Validate required fields
      if (!name || !email || !projectType || !message) {
        return res.status(400).json({ 
          error: 'Missing required fields: name, email, projectType, and message are required' 
        });
      }

      // Send email
      const emailResult = await sendContactFormEmail({
        name,
        email,
        phone,
        projectType,
        budget,
        message,
      });

      return res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully',
        messageId: emailResult.messageId,
      });
    } catch (error) {
      console.error('Send Contact Form Error:', error);
      return res.status(500).json({
        error: 'Failed to submit contact form',
        message: error.message,
      });
    }
  });
});
