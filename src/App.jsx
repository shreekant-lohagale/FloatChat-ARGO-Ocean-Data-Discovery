import React from 'react';
import Header from './components/Header';
import ChatPanel from './components/ChatPanel';
import GlobalMap from './components/GlobalMap';
import VisualizationGallery from './components/VisualizationGallery';
import DataSummary from './components/DataSummary';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <Header />
      
      <main className="container mx-auto py-6 px-4">
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chat Assistant */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border sticky top-1 border-blue-100 h-600">
              <ChatPanel />
            </div>
          </div>
          
          {/* Right Column - Map, Data Summary, and Visualizations */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {/* Interactive Global Map */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <GlobalMap />
              </div>
              
              {/* Data Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DataSummary />
              </div>

              {/* Visualization Gallery */}
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
                <VisualizationGallery />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;