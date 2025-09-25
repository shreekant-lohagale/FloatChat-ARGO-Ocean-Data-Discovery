import React from 'react';

const DataSummary = () => {
  const summaryData = {
    indianOcean: {
      status: "Active",
      title: "Indian Ocean",
      date: "July 2023",
      metrics: [
        { label: "Avg Temperature", value: "28.5°C", change: "+0.8°C", positive: true },
        { label: "Max Salinity", value: "35.2 PSU", change: "+0.3", positive: true },
        { label: "Dominant Current", value: "Westward", change: "Stable", positive: true },
        { label: "Floats Analyzed", value: "128", change: "+12", positive: true }
      ]
    },
    pacificOcean: {
      status: "Active", 
      title: "Pacific Ocean",
      date: "July 2023",
      metrics: [
        { label: "Avg Temperature", value: "25.3°C", change: "+0.5°C", positive: true },
        { label: "Max Salinity", value: "34.9 PSU", change: "+0.1", positive: true },
        { label: "Dominant Current", value: "Eastward", change: "Changing", positive: false },
        { label: "Floats Analyzed", value: "256", change: "+24", positive: true }
      ]
    }
  };

  // Color utility functions
  const getChangeColor = (change, positive = true) => {
    if (change.includes('+') || positive) return 'text-green-200';
    if (change.includes('-')) return 'text-red-200';
    return 'text-blue-200';
  };

  const getChangeBgColor = (change, positive = true) => {
    if (change.includes('+') || positive) return 'bg-green-500/20';
    if (change.includes('-')) return 'bg-red-500/20';
    return 'bg-blue-500/20';
  };

  const getBgGradient = (isIndianOcean = true) => {
    return isIndianOcean 
      ? 'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600'
      : 'bg-gradient-to-br from-green-600 via-green-500 to-emerald-600';
  };

  const OceanCard = ({ data, isIndianOcean = true, index }) => (
    <div className={`${getBgGradient(isIndianOcean)} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h3 className="text-xl font-bold">{data.title}</h3>
            <span className="bg-white/20 text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-sm">
              {data.status}
            </span>
          </div>
          <p className="text-blue-100 text-sm">{data.date}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
          <span className="text-lg">
            {isIndianOcean ? '🌊' : '🌀'}
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="space-y-4 mb-6">
        {data.metrics.map((metric, metricIndex) => (
          <div key={metricIndex} className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-200">
            <div className="flex-1 min-w-0">
              <div className="text-blue-100 text-sm font-medium truncate">{metric.label}</div>
              <div className="text-lg font-bold truncate">{metric.value}</div>
            </div>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getChangeBgColor(metric.change, metric.positive)}`}>
              <span className={`text-xs font-semibold ${getChangeColor(metric.change, metric.positive)}`}>
                {metric.change}
              </span>
              {metric.positive && !metric.change.includes('Stable') && !metric.change.includes('Changing') ? (
                <span className="text-green-300 text-xs">↑</span>
              ) : metric.change.includes('Stable') ? (
                <span className="text-blue-300 text-xs">→</span>
              ) : metric.change.includes('Changing') ? (
                <span className="text-yellow-300 text-xs">↔</span>
              ) : (
                <span className="text-red-300 text-xs">↓</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button className={`
        w-full py-3 rounded-xl font-semibold transition-all duration-200 
        active:scale-95 transform shadow-lg hover:shadow-xl
        ${isIndianOcean 
          ? 'bg-white text-blue-600 hover:bg-blue-50' 
          : 'bg-white text-green-600 hover:bg-green-50'
        }
        text-sm uppercase tracking-wide
      `}>
        {isIndianOcean ? 'View Detailed Analysis' : 'Compare with Indian Ocean'}
      </button>
    </div>
  );

  return (
    <div className="w-full">
      {/* Desktop/Tablet Layout */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <OceanCard data={summaryData.indianOcean} isIndianOcean={true} index={0} />
        <OceanCard data={summaryData.pacificOcean} isIndianOcean={false} index={1} />
      </div>

      {/* Mobile Layout with Carousel-like single card view */}
      <div className="md:hidden space-y-4">
        <OceanCard data={summaryData.indianOcean} isIndianOcean={true} index={0} />
        <OceanCard data={summaryData.pacificOcean} isIndianOcean={false} index={1} />
      </div>

      {/* Mobile Quick Actions */}
      <div className="md:hidden flex space-x-3 mt-6 p-4 bg-gray-50 rounded-2xl">
        <button className="flex-1 bg-white text-gray-700 py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2">
          <span>📊</span>
          <span>Download Report</span>
        </button>
        <button className="flex-1 bg-white text-gray-700 py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2">
          <span>🔄</span>
          <span>Share Data</span>
        </button>
      </div>

      {/* Desktop Quick Actions */}
      <div className="hidden md:flex justify-center space-x-4 mt-6">
        <button className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:from-gray-700 hover:to-gray-800 flex items-center space-x-2">
          <span>📥</span>
          <span>Export Full Dataset</span>
        </button>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 flex items-center space-x-2">
          <span>📈</span>
          <span>Generate Comparison Report</span>
        </button>
      </div>
    </div>
  );
};

export default DataSummary;