import React from 'react';
import ChartCard from './ChartCard';

const ChatMessage = ({ message }) => {
  const isUser = message.type === 'user';
  const isBot = message.type === 'bot';
  const isError = message.type === 'error';

  const renderBotContent = (content) => {
    if (content.data) {
      return (
        <div className="space-y-3 sm:space-y-4">
          <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {content.response}
          </div>
          
          {content.data && (
            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
              <ChartCard 
                title={content.visualization?.title}
                description={content.visualization?.description}
                data={content.data}
              />
            </div>
          )}
        </div>
      );
    }
    
    // Handle long text messages with better formatting
    const textContent = content.response || content;
    return (
      <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
        {textContent}
      </div>
    );
  };

  // Render loading state
  if (message.type === 'loading') {
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] xs:max-w-xs sm:max-w-sm md:max-w-md rounded-lg p-3 sm:p-4 bg-white border">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-gray-500 text-sm">Thinking...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 sm:mb-6`}>
      <div className={`max-w-[85%] xs:max-w-xs sm:max-w-sm md:max-w-md rounded-2xl p-3 sm:p-4 ${
        isUser 
          ? 'bg-blue-600 text-white rounded-br-none' 
          : isError 
            ? 'bg-red-50 border border-red-200 text-red-800 rounded-bl-none' 
            : 'bg-white border border-gray-200 rounded-bl-none'
      } shadow-sm hover:shadow-md transition-shadow duration-200`}>
        
        {/* Message content */}
        <div className="break-words">
          {isBot || isError ? renderBotContent(message.content) : (
            <div className="text-sm sm:text-base leading-relaxed">
              {message.content}
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <div className={`text-xs mt-2 pt-1 border-t ${
          isUser 
            ? 'text-blue-200 border-blue-500' 
            : isError
              ? 'text-red-400 border-red-200'
              : 'text-gray-400 border-gray-200'
        }`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;