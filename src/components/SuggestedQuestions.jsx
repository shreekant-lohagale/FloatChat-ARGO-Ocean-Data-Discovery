import React from 'react';

const SuggestedQuestions = ({ onQuestionClick }) => {
  const questions = [
    "Show ocean conditions for ARGO floats near India",
    "Temperature profile for July 2025",
    "Salinity data for ARGO floats",
    "Compare with previous year data"
  ];

  return (
    <div className="bg-gray-100 p-4 border-t">
      <h4 className="text-sm font-medium text-gray-600 mb-2">Suggested Questions:</h4>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="bg-white text-sm text-gray-700 px-3 py-1 rounded-full border hover:bg-gray-50 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;