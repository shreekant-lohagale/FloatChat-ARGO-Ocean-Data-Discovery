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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input on initial load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const createMessage = (type, content, id = Date.now()) => ({
    id,
    type,
    content,
    timestamp: new Date().toLocaleTimeString(),
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
    setTimeout(() => handleSendMessage(question), 100);
  };

  const LoadingIndicator = () => (
    <div className="flex justify-start">
      <div className="bg-white rounded-lg p-3 shadow-sm border">
        <div className="flex space-x-2">
          {[0, 0.2, 0.4].map((delay) => (
            <div
              key={delay}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );

return (
  <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-lg max-w-4xl mx-auto">
    {/* Chat Header */}
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-t-2xl flex-shrink-0">
      <h2 className="text-xl font-bold text-white">FloatChat Assistant</h2>
      <p className="text-blue-100 text-sm mt-1">ARGO Data Analysis Specialist</p>
    </header>

    {/* Messages Area - Proper height */}
    <main className="min-h-[1100px] max-h-[1200px] flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isLoading && <LoadingIndicator />}
      <div ref={messagesEndRef} />
    </main>

    {/* Suggested Questions */}
    <div className="flex-shrink-0 border-t border-gray-200 bg-white p-3">
      <SuggestedQuestions onQuestionClick={handleSuggestedQuestion} />
    </div>

    {/* Input Area */}
    <footer className="border-t border-gray-200 bg-white p-4 rounded-b-2xl flex-shrink-0">
      <div className="flex space-x-3">
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about ARGO data (e.g., temperature near India)..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 
                     focus:outline-none focus:border-blue-500 focus:ring-2 
                     focus:ring-blue-200 transition-all duration-200"
          disabled={isLoading}
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputMessage.trim() || isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all 
                     duration-200 font-semibold min-w-[80px]"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </footer>
  </div>
);
};

export default ChatPanel;