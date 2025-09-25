import React from 'react';

const SuggestedQuestions = ({ onQuestionClick }) => {
  const questions = [
    "Show ocean conditions for ARGO floats near India",
    "Temperature profile for July 2025",
    "Salinity data for ARGO floats",
    "Compare with previous year data"
  ];

  // Shortened versions for mobile
  const mobileQuestions = [
    "ARGO floats near India",
    "Temperature profile 2025",
    "Salinity data",
    "Compare with previous year"
  ];

  return (
    <div className="bg-gray-100 p-3 sm:p-4 border-t">
      <h4 className="text-sm font-medium text-gray-600 mb-2 sm:mb-3 text-center sm:text-left">
        Suggested Questions:
      </h4>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center sm:justify-start">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="bg-white text-xs sm:text-sm text-gray-700 px-3 py-2 sm:py-1 rounded-full border hover:bg-gray-50 transition-colors text-center sm:text-left"
          >
            <span className="hidden sm:inline">{question}</span>
            <span className="sm:hidden">{mobileQuestions[index]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;