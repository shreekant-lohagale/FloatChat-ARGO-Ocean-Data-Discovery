import React from 'react';
import ChartCard from './ChartCard'; // This should work now with default export
// Alternatively, if you prefer named import:
// import { ChartCard } from './ChartCard';

const ChatMessage = ({ message }) => {
  const isUser = message.type === 'user';
  const isBot = message.type === 'bot';

  const renderBotContent = (content) => {
    if (content.data) {
      return (
        <div className="space-y-4">
          <div className="text-gray-700">{content.response}</div>
          
          {content.data && (
            <ChartCard 
              title={content.visualization?.title}
              description={content.visualization?.description}
              data={content.data}
            />
          )}
        </div>
      );
    }
    
    return <div className="text-gray-700">{content.response || content}</div>;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
        isUser ? 'bg-blue-600 text-white' : 
        message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-white border'
      }`}>
        <div className="text-sm">
          {isBot ? renderBotContent(message.content) : message.content}
        </div>
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;