import React, { useState, useRef, useEffect, useCallback } from 'react';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';
import { floatchatApi } from '../api/floatchatApi';

// Constants
const INITIAL_BOT_MESSAGE = {
  id: 1,
  type: 'bot',
  content: {
    response: "Hello! I'm your ARGO data assistant. I can help you explore ocean conditions, temperature profiles, salinity data, and more. What would you like to know?"
  },
  timestamp: new Date().toLocaleTimeString()
};

const ERROR_MESSAGE = {
  type: 'error',
  content: 'Sorry, there was an error processing your request. Please try again.'
};

const ChatPanel = () => {
  const [messages, setMessages] = useState([INITIAL_BOT_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "nearest"
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input on initial load and after sending message
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const createMessage = (type, content, id = Date.now()) => ({
    id,
    type,
    content,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });

  const handleSendMessage = async (messageContent = inputMessage) => {
    const trimmedMessage = messageContent.trim();
    if (!trimmedMessage || isLoading) return;

    const userMessage = createMessage('user', trimmedMessage);
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await floatchatApi.sendQuery(trimmedMessage);
      const botMessage = createMessage('bot', response);
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = createMessage('error', ERROR_MESSAGE.content);
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
    // Small delay to ensure input is updated before sending
    setTimeout(() => handleSendMessage(question), 50);
  };

  const clearChat = () => {
    setMessages([INITIAL_BOT_MESSAGE]);
    setInputMessage('');
  };

  const LoadingIndicator = () => (
    <div className="flex justify-start mb-4 sm:mb-6">
      <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border max-w-[85%] xs:max-w-xs">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            {[0, 0.1, 0.2].map((delay) => (
              <div
                key={delay}
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm">Processing...</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full min-h-[500px] max-h-[800px] sm:min-h-[600px] bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 mx-auto">
      {/* Chat Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 sm:p-4 rounded-t-2xl sm:rounded-t-3xl flex-shrink-0 flex justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">FloatChat Assistant</h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-0.5">ARGO Data Analysis Specialist</p>
        </div>
        <button
          onClick={clearChat}
          className="text-white text-xs bg-blue-700 hover:bg-blue-800 px-2 sm:px-3 py-1 rounded-lg transition-colors"
          title="Clear conversation"
        >
          Clear
        </button>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-25 to-gray-50">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} className="h-2" />
      </main>

      {/* Suggested Questions */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white p-2 sm:p-3">
        <SuggestedQuestions onQuestionClick={handleSuggestedQuestion} />
      </div>

      {/* Input Area */}
      <footer className="border-t border-gray-100 bg-white p-3 sm:p-4 rounded-b-2xl sm:rounded-b-3xl flex-shrink-0">
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about ARGO data (e.g., temperature near India)..."
              className="w-full border border-gray-300 rounded-xl sm:rounded-2xl px-4 py-3 
                         focus:outline-none focus:border-blue-500 focus:ring-2 
                         focus:ring-blue-200 transition-all duration-200
                         text-sm sm:text-base pr-12 xs:pr-4"
              disabled={isLoading}
              maxLength={500}
            />
            {/* Character count for mobile */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 xs:hidden">
              <span className="text-xs text-gray-400 bg-white px-1">
                {inputMessage.length}/500
              </span>
            </div>
          </div>
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-xl sm:rounded-2xl hover:bg-blue-700 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all 
                       duration-200 font-semibold min-w-[80px] sm:min-w-[100px] flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            ) : (
              <>
                <span className="hidden sm:inline">Send</span>
                <span className="sm:hidden">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </span>
              </>
            )}
          </button>
        </div>
        
        {/* Character count for desktop */}
        <div className="hidden xs:flex justify-between mt-2">
          <span className="text-xs text-gray-400">
            Press Enter to send • Shift+Enter for new line
          </span>
          <span className="text-xs text-gray-400">
            {inputMessage.length}/500 characters
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ChatPanel;