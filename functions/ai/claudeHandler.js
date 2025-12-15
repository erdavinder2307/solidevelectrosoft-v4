const Anthropic = require('@anthropic-ai/sdk');
const functions = require('firebase-functions');

/**
 * System Prompt - STRICT REQUIREMENTS GATHERING
 * DO NOT MODIFY without approval
 */
const SYSTEM_PROMPT = `You are Solidev Electrosoft's AI Requirements Assistant.

Your ONLY responsibility is to collect software project requirements.

Rules:
- Ask one clear question at a time
- Only ask questions related to:
    • project idea
    • business problem
    • target users
    • features
    • platforms (web, mobile, etc.)
    • timeline
    • budget
    • reference apps
- Do NOT provide solutions, code, or opinions
- If user asks unrelated questions, reply:
  "I'm here only to help document your project idea and requirements for Solidev Electrosoft."
- When enough data is collected (minimum 5-6 key questions answered), generate a FINAL REQUIREMENTS SUMMARY with:
    • Project Title
    • Problem Statement
    • Proposed Solution (high-level)
    • Target Users
    • Core Features
    • Optional Features
    • Platforms
    • Timeline
    • Budget
    • References
    • Notes
- After generating the summary, add this exact marker at the end: [REQUIREMENTS_COMPLETE]
- Be friendly, professional, and concise

Additionally, at the end of each message, include a concise JSON payload on a single line that the frontend can parse, formatted exactly as:
{"suggestions":["Option 1","Option 2","Option 3"]}

Rules for suggestions:
- Provide 3–5 short, user-clickable options (max 60 characters each)
- Options should help progress requirements (e.g., pick a platform, confirm a feature, clarify users)
- Avoid punctuation-heavy or multi-sentence suggestions
- If the summary is complete ([REQUIREMENTS_COMPLETE]), provide an empty array: {"suggestions":[]}`;

/**
 * Call Claude Sonnet API
 * @param {string} userMessage - User's current message
 * @param {Array} conversationHistory - Previous messages [{role: 'user'|'assistant', content: string}]
 * @returns {Promise<Object>} - { message: string, isComplete: boolean }
 */
async function callClaudeAI(userMessage, conversationHistory = []) {
  // Get API key from Firebase config
  const apiKey = functions.config().anthropic?.key;
  
  if (!apiKey) {
    throw new Error('Anthropic API key not configured. Run: firebase functions:config:set anthropic.key="YOUR_KEY"');
  }

  // Initialize Anthropic client
  const anthropic = new Anthropic({
    apiKey: apiKey,
  });

  // Build messages array
  const messages = [
    ...conversationHistory,
    {
      role: 'user',
      content: userMessage,
    },
  ];

  try {
    // Call Claude API
    // Note: Using claude-3-sonnet - if you want claude-3-5-sonnet, ensure your API key has access
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    // Extract response text
    const assistantMessage = response.content[0].text;

    // Try to extract backend-provided suggestions JSON
    let suggestions = [];
    let payloadRange = null;
    try {
      const jsonMatch = assistantMessage.match(/\{\"suggestions\"\s*:\s*\[(.*?)\]\}/s);
      if (jsonMatch) {
        const startIndex = jsonMatch.index;
        const endIndex = startIndex + jsonMatch[0].length;
        payloadRange = { startIndex, endIndex };
        const jsonStr = assistantMessage.substring(startIndex, endIndex);
        const parsed = JSON.parse(jsonStr);
        if (Array.isArray(parsed.suggestions)) {
          suggestions = parsed.suggestions
            .map((s) => String(s).trim())
            .filter((s) => s.length > 0 && s.length <= 60)
            .slice(0, 5);
        }
      }
    } catch (e) {
      // Ignore parse errors; UI will fall back to local extraction
    }

    // Check if requirements are complete
    const isComplete = assistantMessage.includes('[REQUIREMENTS_COMPLETE]');
    let cleanMessage = assistantMessage.replace('[REQUIREMENTS_COMPLETE]', '');
    if (payloadRange) {
      cleanMessage = (cleanMessage.slice(0, payloadRange.startIndex) + cleanMessage.slice(payloadRange.endIndex));
    }
    cleanMessage = cleanMessage.trim();

    return {
      message: cleanMessage,
      isComplete: isComplete,
      suggestions,
      usage: response.usage, // For monitoring API usage
    };
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error(`Claude API failed: ${error.message}`);
  }
}

module.exports = {
  callClaudeAI,
  SYSTEM_PROMPT,
};
