const Anthropic = require('@anthropic-ai/sdk');
const functions = require('firebase-functions');

/**
 * The one place the assistant's Claude model is set (Claude Sonnet 5.5).
 * CLAUDE_MODEL in the functions environment overrides it.
 */
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-5-5';

/**
 * Claude Sonnet 5.5 rejects `thinking: {type: "disabled"}` and non-default
 * `temperature`. `between_tools` is its lowest setting: no extended thinking,
 * as on Sonnet 4.5, so latency and max_tokens stay as they were.
 */
const CLAUDE_REQUEST_FIELDS = {
  thinking: { type: 'between_tools' },
};

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

CRITICAL: After EVERY message, you MUST provide 3-4 quick reply suggestions as a JSON array at the end.
Format: {"suggestions":["iOS & Android","iOS only","Android only","Not sure yet"]}

Rules for suggestions:
- Always provide 3-4 specific, actionable options based on your question
- Keep each option under 50 characters
- Options should directly answer the question you just asked
- Make them natural conversation responses
- When asking about budget, use these exact options: ["Under $999", "$999 to $1,999", "$1,999 to $4,599", "Above $4,599"]
- If conversation is complete ([REQUIREMENTS_COMPLETE]), use: {"suggestions":[]}`;
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
    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,
      ...CLAUDE_REQUEST_FIELDS,
    });

    // Read the reply by block type: the first block is not always text
    const assistantMessage = extractReplyText(response);

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
      // Ignore parse errors; will try fallback extraction
    }

    // FALLBACK: If no JSON suggestions found, extract from message content
    if (suggestions.length === 0) {
      const lines = assistantMessage.split('\n').map((l) => l.trim());
      
      // Method 1: Extract bullet points
      const bullets = lines
        .filter((l) => /^(-|•|\d+\.)\s+/.test(l))
        .map((l) => l.replace(/^(-|•|\d+\.)\s+/, '').replace(/\?$/, ''))
        .filter((l) => l.length > 5 && l.length <= 60);
      
      suggestions.push(...bullets);
      
      // Method 2: Extract "For example:" inline patterns
      const exampleMatch = assistantMessage.match(/for example[:\s]+([^.?!]+[.?!])/i);
      if (exampleMatch) {
        const exampleText = exampleMatch[1];
        // Split on common separators
        const parts = exampleText.split(/,|\bor\b/)
          .map((s) => s.trim())
          .filter((s) => s.length > 5 && s.length <= 60);
        suggestions.push(...parts);
      }
      
      // Deduplicate and limit to 4
      suggestions = Array.from(new Set(suggestions)).slice(0, 4);
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

/**
 * Join the text blocks of a Messages API response.
 * @param {Object} response - Messages API response
 * @returns {string}
 */
function extractReplyText(response) {
  if (response.stop_reason === 'refusal') {
    throw new Error('Claude declined to answer this message');
  }
  const text = (response.content || [])
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('');
  if (!text) {
    throw new Error(`Claude returned no text (stop_reason: ${response.stop_reason})`);
  }
  return text;
}

module.exports = {
  callClaudeAI,
  extractReplyText,
  SYSTEM_PROMPT,
  CLAUDE_MODEL,
  CLAUDE_REQUEST_FIELDS,
};
