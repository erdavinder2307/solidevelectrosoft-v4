import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToAI, sendRequirementsToEmail } from '../../services/aiService';

/**
 * AI Project Requirements Assistant
 * Mobile-first chat interface for gathering project requirements
 * 
 * Props:
 * - isOpen: boolean - Controls modal visibility
 * - onClose: function - Close modal callback
 * - initialMessage: string - Optional pre-filled message
 */
const AIProjectAssistant = ({ isOpen = false, onClose, initialMessage = '' }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState(initialMessage);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [requirementsSummary, setRequirementsSummary] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Extract quick replies from an assistant message body
  const getQuickReplies = (text) => {
    if (!text) return [];
    const lines = text.split('\n').map((l) => l.trim());
    const bullets = lines.filter((l) => /^(-|•|\d+\.)\s+/.test(l))
      .map((l) => l.replace(/^(-|•|\d+\.)\s+/, ''))
      .filter((l) => l.length > 0 && l.length <= 80);
    // Deduplicate and cap to 5 suggestions
    const uniq = Array.from(new Set(bullets)).slice(0, 5);
    return uniq;
  };

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send initial greeting when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = {
        role: 'assistant',
        content: "Hi! I'm here to help gather requirements for your software project. Let's start with a simple question: What problem are you trying to solve with this project?",
      };
      setMessages([greeting]);
    }
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  /**
   * Send user message to AI backend
   */
  const handleSendMessage = async (e, overrideMessage) => {
    e?.preventDefault();

    const candidate = typeof overrideMessage === 'string' ? overrideMessage : inputValue;
    if (!candidate.trim() || isLoading) return;

    const userMessage = candidate.trim();
    setInputValue('');

    // Add user message to UI
    const newUserMessage = { role: 'user', content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);

    setIsLoading(true);

    try {
      // Build conversation history for API
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call AI backend
      const aiResponse = await sendMessageToAI(userMessage, conversationHistory);

      // Add AI response to UI
      const assistantMessage = {
        role: 'assistant',
        content: aiResponse.message,
        suggestions: Array.isArray(aiResponse.suggestions) ? aiResponse.suggestions : [],
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Check if requirements are complete
      if (aiResponse.isComplete) {
        setIsComplete(true);
        setRequirementsSummary(aiResponse.message);
      }
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact us directly at davinder@solidevelectrosoft.com',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clicking a quick reply option
  const handleQuickReply = async (reply) => {
    // submit immediately using the provided reply to avoid setState race
    await handleSendMessage(undefined, reply);
  };

  /**
   * Submit final requirements to email
   */
  const handleSubmitRequirements = async () => {
    setIsSubmitting(true);

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      await sendRequirementsToEmail({
        requirementsSummary,
        conversationHistory,
        userEmail: userEmail || 'Not provided',
      });

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submit Error:', error);
      alert('Failed to submit requirements. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Close modal and reset state
   */
  const handleClose = () => {
    setMessages([]);
    setInputValue('');
    setIsComplete(false);
    setRequirementsSummary('');
    setUserEmail('');
    setSubmitSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
          }}
          onClick={handleClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '0',
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            className="ai-assistant-modal"
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, var(--color-primary-500) 0%, #8b5cf6 100%)',
                color: 'white',
                padding: 'var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: '600' }}>
                  🤖 AI Requirements Assistant
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: 'var(--text-xs)', opacity: 0.9 }}>
                  Powered by Claude Sonnet
                </p>
              </div>
              <button
                onClick={handleClose}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '8px',
                  lineHeight: '1',
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Success State */}
            {submitSuccess ? (
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--space-8)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'var(--color-success-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-500)" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                  Requirements Submitted!
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>
                  Thank you! We've received your project requirements and will get back to you within 24 hours.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a
                    href="https://wa.me/919115866828"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modern-btn modern-btn-primary"
                  >
                    Chat on WhatsApp
                  </a>
                  <button
                    onClick={handleClose}
                    className="modern-btn modern-btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Messages Area */}
                <div
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 'var(--space-4)',
                    background: 'var(--bg-secondary)',
                  }}
                  className="ai-messages-container"
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: 'flex',
                        justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '85%',
                          padding: 'var(--space-3) var(--space-4)',
                          borderRadius: 'var(--radius-lg)',
                          background: message.role === 'user' 
                            ? 'linear-gradient(135deg, var(--color-primary-500) 0%, #8b5cf6 100%)'
                            : 'white',
                          color: message.role === 'user' ? 'white' : 'var(--text-primary)',
                          fontSize: 'var(--text-base)',
                          lineHeight: '1.6',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}

                  {/* Quick reply buttons for the latest assistant message */}
                  {(() => {
                    const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
                    const suggestions = lastAssistant && Array.isArray(lastAssistant.suggestions) && lastAssistant.suggestions.length > 0
                      ? lastAssistant.suggestions
                      : lastAssistant
                        ? getQuickReplies(lastAssistant.content)
                        : [];
                    if (!isLoading && suggestions.length > 0 && !isComplete) {
                      return (
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 'var(--space-2)',
                            marginBottom: 'var(--space-4)',
                          }}
                        >
                          {suggestions.map((s, i) => (
                            <button
                              key={`${s}-${i}`}
                              onClick={() => handleQuickReply(s)}
                              className="modern-btn modern-btn-secondary"
                              style={{
                                fontSize: 'var(--text-sm)',
                                padding: '8px 12px',
                                borderRadius: 'var(--radius-full)',
                                borderColor: 'var(--border-light)',
                                background: 'white',
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      <div
                        style={{
                          padding: 'var(--space-3) var(--space-4)',
                          borderRadius: 'var(--radius-lg)',
                          background: 'white',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          display: 'flex',
                          gap: '6px',
                        }}
                      >
                        <span className="typing-dot" style={{ animation: 'typing-pulse 1.4s infinite' }}>●</span>
                        <span className="typing-dot" style={{ animation: 'typing-pulse 1.4s 0.2s infinite' }}>●</span>
                        <span className="typing-dot" style={{ animation: 'typing-pulse 1.4s 0.4s infinite' }}>●</span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Requirements Complete - Email Input */}
                {isComplete && !submitSuccess && (
                  <div
                    style={{
                      padding: 'var(--space-4)',
                      background: 'var(--color-success-50)',
                      borderTop: '2px solid var(--color-success-200)',
                    }}
                  >
                    <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', color: 'var(--text-secondary)' }}>
                      <strong>Great!</strong> We've gathered your requirements. Enter your email to receive a copy:
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexDirection: 'column' }}>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="your@email.com (optional)"
                        style={{
                          padding: 'var(--space-3)',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: 'var(--text-base)',
                          width: '100%',
                        }}
                      />
                      <button
                        onClick={handleSubmitRequirements}
                        disabled={isSubmitting}
                        className="modern-btn modern-btn-primary"
                        style={{ width: '100%' }}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Requirements'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Input Area */}
                {!isComplete && (
                  <form
                    onSubmit={(e) => handleSendMessage(e)}
                    style={{
                      padding: 'var(--space-4)',
                      background: 'white',
                      borderTop: '1px solid var(--border-light)',
                      display: 'flex',
                      gap: 'var(--space-2)',
                      flexShrink: 0,
                    }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      style={{
                        flex: 1,
                        padding: 'var(--space-3) var(--space-4)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-base)',
                        outline: 'none',
                        minHeight: '48px',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !inputValue.trim()}
                      style={{
                        padding: '0 var(--space-6)',
                        background: 'linear-gradient(135deg, var(--color-primary-500) 0%, #8b5cf6 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-base)',
                        fontWeight: '600',
                        cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                        opacity: isLoading || !inputValue.trim() ? 0.6 : 1,
                        minHeight: '48px',
                        minWidth: '80px',
                      }}
                    >
                      Send
                    </button>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIProjectAssistant;
