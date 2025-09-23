import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">FloatChat - ARGO Ocean Data Discovery</h1>
          <p className="text-xl text-blue-100">Ask, Explore, Visualize. Ocean Data, Simplified.</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-500 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold">Live Data Streaming</span>
            </div>
            <div className="text-sm">
              <span className="text-blue-200">Last updated:</span> July 2023
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-blue-200">API Status</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">Connected - 12 Active Floats</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;