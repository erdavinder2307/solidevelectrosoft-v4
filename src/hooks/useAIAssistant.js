import { useState } from 'react';

/**
 * Custom hook to manage AI Assistant modal state
 * Use this in pages/components that need to trigger the AI assistant
 * 
 * Example:
 * const { isAIOpen, openAI, closeAI } = useAIAssistant();
 * 
 * <button onClick={openAI}>Start AI Chat</button>
 * <AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} />
 */
export function useAIAssistant() {
  const [isAIOpen, setIsAIOpen] = useState(false);

  const openAI = () => {
    setIsAIOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeAI = () => {
    setIsAIOpen(false);
    // Restore body scroll
    document.body.style.overflow = '';
  };

  return {
    isAIOpen,
    openAI,
    closeAI,
  };
}
