import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            FloatChat - ARGO Ocean Data Discovery
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 px-2">
            Ask, Explore, Visualize. Ocean Data, Simplified.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 bg-blue-500 px-3 py-2 sm:px-4 sm:py-2 rounded-full">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm sm:text-base">Live Data Streaming</span>
            </div>
            <div className="text-sm text-center sm:text-left">
              <span className="text-blue-200">Last updated:</span> July 2023
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center sm:text-right">
              <div className="text-sm text-blue-200">API Status</div>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-sm sm:text-base">Connected - 12 Active Floats</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;