import React from 'react';

const DataSummary = () => {
  const summaryData = {
    indianOcean: {
      title: "Indian Ocean (July 2023)",
      metrics: [
        { label: "Avg Temperature", value: "28.5°C", change: "+0.8°C" },
        { label: "Max Salinity", value: "35.2 PSU", change: "+0.3" },
        { label: "Dominant Current", value: "Westward", change: "Stable" },
        { label: "Floats Analyzed", value: "128", change: "+12" }
      ]
    },
    pacificOcean: {
      title: "Pacific Ocean (July 2023)",
      metrics: [
        { label: "Avg Temperature", value: "25.3°C", change: "+0.5°C" },
        { label: "Max Salinity", value: "34.9 PSU", change: "+0.1" },
        { label: "Dominant Current", value: "Eastward", change: "Changing" },
        { label: "Floats Analyzed", value: "256", change: "+24" }
      ]
    }
  };

  // Color utility function for change indicators
  const getChangeColor = (change, isIndianOcean = true) => {
    if (change.includes('+')) return isIndianOcean ? 'text-green-200' : 'text-green-200';
    if (change.includes('-')) return isIndianOcean ? 'text-red-200' : 'text-red-200';
    return isIndianOcean ? 'text-blue-200' : 'text-green-200';
  };

  const getBgGradient = (isIndianOcean = true) => {
    return isIndianOcean 
      ? 'bg-gradient-to-br from-blue-500 to-cyan-600'
      : 'bg-gradient-to-br from-green-500 to-emerald-600';
  };

  const getTextColor = (isIndianOcean = true) => {
    return isIndianOcean ? 'text-blue-100' : 'text-green-100';
  };

  const getButtonStyle = (isIndianOcean = true) => {
    return isIndianOcean 
      ? 'bg-white text-blue-600 hover:bg-blue-50'
      : 'bg-white text-green-600 hover:bg-green-50';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
      {/* Indian Ocean Summary */}
      <div className={`${getBgGradient(true)} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-bold leading-tight">{summaryData.indianOcean.title}</h3>
          <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">Active</span>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          {summaryData.indianOcean.metrics.map((metric, index) => (
            <div key={index} className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2 py-2 xs:py-1">
              <span className={`text-sm sm:text-base ${getTextColor(true)} font-medium`}>{metric.label}</span>
              <div className="flex items-center justify-between xs:justify-end xs:space-x-3">
                <div className="font-semibold text-sm sm:text-base">{metric.value}</div>
                <div className={`text-xs px-2 py-1 rounded-full bg-white/10 ${getChangeColor(metric.change, true)} font-medium`}>
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className={`w-full mt-4 sm:mt-5 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 active:scale-95 ${getButtonStyle(true)} text-sm sm:text-base`}>
          View Detailed Analysis
        </button>
      </div>

      {/* Pacific Ocean Summary */}
      <div className={`${getBgGradient(false)} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-bold leading-tight">{summaryData.pacificOcean.title}</h3>
          <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">Active</span>
        </div>
        
        <div className="space-y-2 sm:space-y-3">
          {summaryData.pacificOcean.metrics.map((metric, index) => (
            <div key={index} className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2 py-2 xs:py-1">
              <span className={`text-sm sm:text-base ${getTextColor(false)} font-medium`}>{metric.label}</span>
              <div className="flex items-center justify-between xs:justify-end xs:space-x-3">
                <div className="font-semibold text-sm sm:text-base">{metric.value}</div>
                <div className={`text-xs px-2 py-1 rounded-full bg-white/10 ${getChangeColor(metric.change, false)} font-medium`}>
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className={`w-full mt-4 sm:mt-5 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 active:scale-95 ${getButtonStyle(false)} text-sm sm:text-base`}>
          Compare with Indian Ocean
        </button>
      </div>

      {/* Mobile-only quick actions */}
      <div className="lg:hidden flex space-x-3 mt-2">
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          Download Report
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          Share Data
        </button>
      </div>
    </div>
  );
};

export default DataSummary;