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

  return (
    <>
      {/* Indian Ocean Summary */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-4">{summaryData.indianOcean.title}</h3>
        <div className="space-y-3">
          {summaryData.indianOcean.metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-blue-100">{metric.label}</span>
              <div className="text-right">
                <div className="font-semibold">{metric.value}</div>
                <div className={`text-xs ${
                  metric.change.includes('+') ? 'text-green-200' : 
                  metric.change.includes('-') ? 'text-red-200' : 'text-blue-200'
                }`}>
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          View Detailed Analysis
        </button>
      </div>

      {/* Pacific Ocean Summary */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-4">{summaryData.pacificOcean.title}</h3>
        <div className="space-y-3">
          {summaryData.pacificOcean.metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-green-100">{metric.label}</span>
              <div className="text-right">
                <div className="font-semibold">{metric.value}</div>
                <div className={`text-xs ${
                  metric.change.includes('+') ? 'text-green-200' : 
                  metric.change.includes('-') ? 'text-red-200' : 'text-green-200'
                }`}>
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 bg-white text-green-600 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
          Compare with Indian Ocean
        </button>
      </div>
    </>
  );
};

export default DataSummary;