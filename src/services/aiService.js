/**
 * AI Service - Connects React frontend to Firebase Functions
 * Handles communication with Claude AI backend
 */

// Use Vite's import.meta.env for environment variables
// Set VITE_FIREBASE_FUNCTIONS_URL in .env.local or as a build variable
const FIREBASE_FUNCTIONS_URL = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL || 'https://us-central1-solidev-electrosoft.cloudfunctions.net';

/**
 * Send message to AI assistant
 * @param {string} userMessage - User's message
 * @param {Array} conversationHistory - Previous messages
 * @param {Object} selectedStage - Selected MVP stage (optional)
 * @returns {Promise<Object>} - { message: string, isComplete: boolean }
 */
export async function sendMessageToAI(userMessage, conversationHistory = [], selectedStage = null) {
  try {
    const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/aiRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessage,
        conversationHistory,
        selectedStage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get AI response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
}

/**
 * Send final requirements summary to email
 * @param {Object} data - Requirements data
 * @param {string} data.requirementsSummary - Final summary
 * @param {Array} data.conversationHistory - Full conversation
 * @param {string} data.userEmail - User's email (optional)
 * @returns {Promise<Object>} - { success: boolean, messageId: string, adminEmail: string }
 */
export async function sendRequirementsToEmail({ requirementsSummary, conversationHistory, userEmail, selectedStage = 'Custom Project' }) {
  try {
    const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/sendRequirements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requirementsSummary,
        conversationHistory,
        userEmail,
        selectedStage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send requirements');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Send Requirements Error:', error);
    throw error;
  }
}
