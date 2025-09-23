import React, { useState, useEffect } from 'react';
// Assuming argoData is correctly defined in argoData.js
// Example structure:
// export const argoData = {
//   monthlyData: {
//     months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//     temperature: [25, 26, 27, 27.5, 28, 28.5, 29, 28, 27, 26, 25.5, 25], // Example values for temp
//     salinity: [34.5, 34.6, 34.7, 34.6, 34.8, 34.9, 35.0, 34.9, 34.7, 34.6, 34.5, 34.4], // Example values for salinity
//     currents: [0.5, 0.6, 0.7, 0.65, 0.8, 0.9, 1.0, 0.9, 0.75, 0.6, 0.55, 0.5], // Example values for currents
//   },
//   temperatureProfiles: { ... }, // Add this if you don't have it
//   salinityProfiles: { ... },    // Add this if you don't have it
//   currentsProfiles: { ... },    // Add this if you don't have it
//   tsDiagramData: {
//     indianOcean: [
//       { salinity: 34.5, temp: 28, depth: 'surface' },
//       { salinity: 34.7, temp: 20, depth: 'thermocline' },
//       { salinity: 35.0, temp: 12, depth: 'deep' },
//     ],
//     pacificOcean: [
//       { salinity: 34.0, temp: 26, depth: 'surface' },
//       { salinity: 34.2, temp: 18, depth: 'thermocline' },
//       { salinity: 34.5, temp: 10, depth: 'deep' },
//     ]
//   }
// };
import { argoData } from '../data/argoData';

const VisualizationGallery = () => {
  const [activeTab, setActiveTab] = useState('temperature');
  const [selectedRegion, setSelectedRegion] = useState('indianOcean');
  const [hoveredData, setHoveredData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('2023');
  const [selectedDepth, setSelectedDepth] = useState('surface');

  // NEW STATE for chart type
  const [chartType, setChartType] = useState('line'); // 'bar', 'line', 'area'

  // Simulate loading state for better UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeTab, selectedRegion, timeRange, chartType]); // Add chartType to dependencies

  // Helper to calculate Y position for lines/areas
  const calculateYPosition = (value, minValue, maxValue, chartHeight) => {
    if (maxValue === minValue) return chartHeight / 2; // Avoid division by zero
    return chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
  };

  const renderChart = () => {
    const data = argoData.monthlyData[activeTab] || argoData.monthlyData.temperature;
    const months = argoData.monthlyData.months;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);

    if (activeTab === 'ts-diagram') {
      return renderTSDiagram();
    }

    // Chart dimensions for SVG
    const chartHeight = 200; // Fixed height for the chart area
    const chartWidth = 700; // Max width, will be scaled by CSS
    const paddingLeft = 40; // Space for Y-axis labels
    const paddingBottom = 30; // Space for X-axis labels
    const effectiveChartWidth = chartWidth - paddingLeft;
    const effectiveChartHeight = chartHeight - paddingBottom;
    const barWidth = (effectiveChartWidth / data.length) * 0.7; // 70% of available space per bar
    const barSpacing = (effectiveChartWidth / data.length) * 0.3; // 30% spacing

    // Calculate points for Line and Area charts
    const points = data.map((value, index) => {
      const x = paddingLeft + (index * (effectiveChartWidth / data.length)) + (effectiveChartWidth / data.length) / 2; // Center of the segment
      const y = calculateYPosition(value, minValue, maxValue, effectiveChartHeight);
      return `${x},${y}`;
    }).join(' ');

    const areaPoints = `${paddingLeft},${effectiveChartHeight} ${points} ${effectiveChartWidth + paddingLeft},${effectiveChartHeight}`;


    return (
      <div className="space-y-6">
        {/* Header with enhanced controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold capitalize">
              {activeTab === 'currents' ? 'Current Speed' : activeTab} Analysis
            </h3>
            <p className="text-gray-600 text-sm">{selectedRegion.replace('Ocean', ' Ocean')} • {timeRange}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm"
            >
              <option value="indianOcean">Indian Ocean</option>
              <option value="pacificOcean">Pacific Ocean</option>
              <option value="atlanticOcean">Atlantic Ocean</option>
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm"
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="5y">5-Year Trend</option>
            </select>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md">
              📊 Download Report
            </button>
          </div>
        </div>

        {/* Enhanced Monthly Trend Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-xl p-6 border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-lg">Monthly Trends</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartType('bar')}
                  className={`text-xs px-2 py-1 rounded ${chartType === 'bar' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
                >
                  Bar
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`text-xs px-2 py-1 rounded ${chartType === 'line' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
                >
                  Line
                </button>
                <button
                  onClick={() => setChartType('area')}
                  className={`text-xs px-2 py-1 rounded ${chartType === 'area' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}
                >
                  Area
                </button>
              </div>
            </div>

            {/* Interactive Chart Container - Now using SVG for more flexibility */}
            <div className="relative overflow-hidden" style={{ height: chartHeight + paddingBottom }}>
              <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight + paddingBottom}`} preserveAspectRatio="none">
                {/* Y-Axis Grid Lines & Labels */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const y = effectiveChartHeight - (ratio * effectiveChartHeight);
                  const value = (minValue + ratio * (maxValue - minValue)).toFixed(1);
                  return (
                    <g key={`y-axis-${i}`}>
                      <line x1={paddingLeft} y1={y} x2={chartWidth} y2={y} stroke="#e5e7eb" strokeDasharray="2,2" />
                      <text x={paddingLeft - 5} y={y + 3} textAnchor="end" fontSize="10" fill="#6b7280">
                        {value}{activeTab === 'temperature' ? '°C' : activeTab === 'salinity' ? 'PSU' : 'm/s'}
                      </text>
                    </g>
                  );
                })}
                {/* X-Axis Labels */}
                {months.map((month, index) => {
                  const x = paddingLeft + (index * (effectiveChartWidth / data.length)) + (effectiveChartWidth / data.length) / 2;
                  return (
                    <text key={month} x={x} y={chartHeight + 15} textAnchor="middle" fontSize="10" fill="#6b7280">
                      {month.slice(0, 3)}
                    </text>
                  );
                })}

                {chartType === 'bar' && data.map((value, index) => {
                  const height = (value - minValue) / (maxValue - minValue) * effectiveChartHeight;
                  const x = paddingLeft + (index * (effectiveChartWidth / data.length)) + (barSpacing / 2);
                  const y = effectiveChartHeight - height; // Bars start from bottom
                  return (
                    <rect
                      key={months[index]}
                      x={x}
                      y={y}
                      width={barWidth}
                      height={height}
                      fill="url(#barGradient)"
                      className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                      onMouseEnter={() => setHoveredData({ month: months[index], value: data[index], type: activeTab })}
                      onMouseLeave={() => setHoveredData(null)}
                    />
                  );
                })}

                {chartType === 'line' && (
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    points={points}
                    className="transition-all duration-300"
                  />
                )}

                {chartType === 'area' && (
                  <polygon
                    fill="url(#areaGradient)"
                    points={areaPoints}
                    className="transition-all duration-300"
                  />
                )}
                {/* Line/Area Hover Circles */}
                {(chartType === 'line' || chartType === 'area') && data.map((value, index) => {
                  const x = paddingLeft + (index * (effectiveChartWidth / data.length)) + (effectiveChartWidth / data.length) / 2;
                  const y = calculateYPosition(value, minValue, maxValue, effectiveChartHeight);
                  return (
                    <circle
                      key={`dot-${months[index]}`}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#2563eb"
                      stroke="white"
                      strokeWidth="2"
                      className="transition-all duration-300 hover:r-7 cursor-pointer"
                      onMouseEnter={() => setHoveredData({ month: months[index], value: data[index], type: activeTab })}
                      onMouseLeave={() => setHoveredData(null)}
                    />
                  );
                })}

                {/* Gradients for fills */}
                <defs>
                  <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'rgb(59,130,246)', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: 'rgb(96,165,250)', stopOpacity: 0.7}} />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'rgb(59,130,246)', stopOpacity: 0.6}} />
                    <stop offset="100%" style={{stopColor: 'rgb(96,165,250)', stopOpacity: 0}} />
                  </linearGradient>
                </defs>

              </svg>

              {/* Hover Tooltip - outside SVG for better styling with Tailwind */}
              {hoveredData && (
                <div
                  className="absolute bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10"
                  style={{
                    left: `${paddingLeft + (months.indexOf(hoveredData.month) * (effectiveChartWidth / data.length)) + (effectiveChartWidth / data.length) / 2}px`,
                    top: `${calculateYPosition(hoveredData.value, minValue, maxValue, effectiveChartHeight) - 40}px`, // Adjust for tooltip height
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="font-semibold">{hoveredData.month}</div>
                  <div>{hoveredData.value}{activeTab === 'temperature' ? '°C' : activeTab === 'salinity' ? 'PSU' : 'm/s'}</div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
            <h4 className="font-semibold mb-4 text-white">Current Status</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Current Value</span>
                  <span className="font-semibold">
                    {data[data.length - 1]}{activeTab === 'temperature' ? '°C' : activeTab === 'salinity' ? 'PSU' : 'm/s'}
                  </span>
                </div>
                <div className="w-full bg-blue-400 rounded-full h-2 mt-1">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: `${((data[data.length - 1] - minValue) / (maxValue - minValue)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span>Monthly Change</span>
                <span className={`font-semibold ${data[data.length - 1] > data[data.length - 2] ? 'text-green-200' : 'text-red-200'}`}>
                  {data[data.length - 1] > data[data.length - 2] ? '↑' : '↓'}
                  {Math.abs(data[data.length - 1] - data[data.length - 2]).toFixed(1)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Annual Trend</span>
                <span className="font-semibold text-green-200">↑ +2.3%</span>
              </div>

              <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors mt-4">
                View Anomaly Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Depth Profile with Interactive Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">Depth Profile Analysis</h4>
              <select
                value={selectedDepth}
                onChange={(e) => setSelectedDepth(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm"
              >
                <option value="surface">Surface (0-100m)</option>
                <option value="thermocline">Thermocline (100-500m)</option>
                <option value="deep">Deep (500-2000m)</option>
              </select>
            </div>

            <div className="space-y-4">
              {Object.entries(argoData[`${activeTab}Profiles`]?.[selectedRegion] || argoData.temperatureProfiles[selectedRegion] || {}).map(([depth, value]) => {
                // Ensure profile data exists before mapping
                const profileData = argoData[`${activeTab}Profiles`]?.[selectedRegion] || argoData.temperatureProfiles[selectedRegion] || {};
                const values = Object.values(profileData);
                const maxProfileValue = values.length > 0 ? Math.max(...values) : 1;
                const minProfileValue = values.length > 0 ? Math.min(...values) : 0;

                const getBarWidth = () => {
                  if (maxProfileValue === minProfileValue) return '50%';
                  const width = ((value - minProfileValue) / (maxProfileValue - minProfileValue)) * 100;
                  return `${Math.max(0, Math.min(100, width))}%`;
                };

                return (
                  <div key={depth} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700 capitalize">{depth}:</span>
                      <span className="font-semibold">
                        {value} {activeTab === 'temperature' ? '°C' : activeTab === 'salinity' ? 'PSU' : 'm/s'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 group-hover:shadow-lg ${
                          activeTab === 'temperature' ? 'bg-gradient-to-r from-red-400 to-red-600' :
                          activeTab === 'salinity' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                          'bg-gradient-to-r from-blue-400 to-blue-600'
                        }`}
                        style={{ width: getBarWidth() }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Data Summary with Sparklines */}
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h4 className="font-semibold mb-4">Statistical Summary</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {(data.reduce((a, b) => a + b, 0) / data.length).toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600">Average</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{maxValue}</div>
                  <div className="text-xs text-gray-600">Maximum</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{minValue}</div>
                  <div className="text-xs text-gray-600">Minimum</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{data.length}</div>
                  <div className="text-xs text-gray-600">Data Points</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Data Quality</span>
                  <span className="font-semibold text-green-600">Excellent</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced TS Diagram with SVG and interactivity
  const renderTSDiagram = () => {
    const tsData = argoData.tsDiagramData[selectedRegion] || []; // Ensure tsData is an array
    const minSalinity = 34; // Example min/max for scaling
    const maxSalinity = 36.2;
    const minTemp = 8;
    const maxTemp = 30;

    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold">Temperature-Salinity Diagram</h3>
            <p className="text-gray-600 text-sm">{selectedRegion.replace('Ocean', ' Ocean')} • Water Mass Characteristics</p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm"
            >
              <option value="indianOcean">Indian Ocean</option>
              <option value="pacificOcean">Pacific Ocean</option>
            </select>
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:from-green-700 hover:to-emerald-700 transition-all shadow-md">
              📈 Download TS Data
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="h-96 relative">
            <svg width="100%" height="100%" viewBox={`0 0 ${1000} ${500}`} preserveAspectRatio="xMidYMid meet" className="border-b border-l">
              {/* Grid lines */}
              {[...Array(6)].map((_, i) => ( // 5 horizontal lines for 6 sections
                <line key={`h-${i}`} x1="0" y1={(i / 5) * 100 + '%'} x2="100%" y2={(i / 5) * 100 + '%'} stroke="#e5e7eb" />
              ))}
              {[...Array(8)].map((_, i) => ( // 7 vertical lines for 8 sections
                <line key={`v-${i}`} x1={(i / 7) * 100 + '%'} y1="0" x2={(i / 7) * 100 + '%'} y2="100%" stroke="#e5e7eb" />
              ))}

              {/* Data points with depth-based coloring */}
              {tsData.map((point, index) => {
                // Scale salinity (x) from 34-36.2 to 0-100%
                const x = ((point.salinity - minSalinity) / (maxSalinity - minSalinity)) * 100;
                // Scale temperature (y) from 8-30 to 0-100%, then invert for SVG (y=0 is top)
                const y = 100 - ((point.temp - minTemp) / (maxTemp - minTemp)) * 100;
                const depthColor = point.depth === 'surface' ? '#3b82f6' :
                                   point.depth === 'thermocline' ? '#10b981' : '#8b5cf6';

                return (
                  <g key={index}>
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="8"
                      fill={depthColor}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-10 transition-all"
                      onMouseEnter={() => setHoveredData(point)}
                      onMouseLeave={() => setHoveredData(null)}
                    />
                    <text
                      x={`${x}%`}
                      y={`${y}%`}
                      textAnchor="middle"
                      dy=".3em"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {index + 1}
                    </text>
                  </g>
                );
              })}

              {/* Hover tooltip - adjusted to be relative to SVG but use foreignObject for Tailwind */}
              {hoveredData && (
                <foreignObject
                  x={((hoveredData.salinity - minSalinity) / (maxSalinity - minSalinity)) * 100 + '%'}
                  y={100 - ((hoveredData.temp - minTemp) / (maxTemp - minTemp)) * 100 - 60 + '%'} // Adjust for tooltip height
                  width="120" // Max width of tooltip
                  height="80" // Max height of tooltip
                  style={{ overflow: 'visible', pointerEvents: 'none' }} // Prevents tooltip from blocking clicks on circles
                >
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    className="bg-gray-900 text-white p-2 rounded-lg text-xs shadow-xl whitespace-nowrap"
                    style={{ transform: 'translateX(-50%)' }} // Center tooltip
                  >
                    <div className="font-semibold capitalize">{hoveredData.depth} Water</div>
                    <div>Temp: {hoveredData.temp}°C</div>
                    <div>Salinity: {hoveredData.salinity} PSU</div>
                  </div>
                </foreignObject>
              )}
            </svg>

            {/* Axes labels */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between p-2 text-sm text-gray-600">
              <span className="absolute left-0 bottom-0 rotate-[-90deg] origin-bottom-left ml-[-30px] mt-[100px] text-center w-[100px]">Temperature (°C)</span>
              <span className="absolute bottom-0 right-0 mr-[100px]">Salinity (PSU) →</span>
            </div>
          </div>

          {/* Enhanced Information Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <h4 className="font-semibold mb-3">Depth Point Analysis</h4>
              <div className="grid grid-cols-2 gap-4">
                {tsData.map((point, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{
                        backgroundColor: point.depth === 'surface' ? '#3b82f6' :
                                       point.depth === 'thermocline' ? '#10b981' : '#8b5cf6'
                      }}
                    ></div>
                    <div className="flex-1">
                      <div className="font-medium capitalize">{point.depth}</div>
                      <div className="text-sm text-gray-600">{point.temp}°C, {point.salinity} PSU</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-4 text-white">
              <h4 className="font-semibold mb-3">Water Mass Characteristics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Surface Water</span>
                    <span>Warm, Low Salinity</span>
                  </div>
                  <div className="w-full bg-green-400 rounded-full h-1 mt-1">
                    <div className="bg-white h-1 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Intermediate</span>
                    <span>Cooler, Higher Salinity</span>
                  </div>
                  <div className="w-full bg-green-400 rounded-full h-1 mt-1">
                    <div className="bg-white h-1 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Deep Water</span>
                    <span>Cold, Highest Salinity</span>
                  </div>
                  <div className="w-full bg-green-400 rounded-full h-1 mt-1">
                    <div className="bg-white h-1 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-4"> {/* Added p-4 for some padding */}
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Ocean Data Visualization Dashboard</h2>
          <p className="text-gray-600">Interactive analysis of oceanographic parameters and trends</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">July 2023 Data</span>
          <button className="text-gray-600 hover:text-gray-800">⚙️</button>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="bg-white rounded-xl p-2 shadow-sm">
        <div className="flex space-x-1">
          {[
            { id: 'temperature', label: '🌡️ Temperature', color: 'red' },
            { id: 'salinity', label: '🧂 Salinity', color: 'green' },
            { id: 'currents', label: '🌊 Currents', color: 'blue' },
            { id: 'ts-diagram', label: '📈 TS Diagram', color: 'purple' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 font-medium capitalize rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? `bg-${tab.color}-100 text-${tab.color}-600 shadow-md`
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="py-4 transition-opacity duration-300">
        {!isLoading && renderChart()}
      </div>

      {/* Enhanced Action Panel */}
      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <h4 className="font-semibold mb-4">Quick Actions & Export</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
            <span className="text-2xl mb-2">📊</span>
            <span className="font-medium text-sm">Compare Regions</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
            <span className="text-2xl mb-2">📥</span>
            <span className="font-medium text-sm">Export Data</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
            <span className="text-2xl mb-2">📋</span>
            <span className="font-medium text-sm">Generate Report</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
            <span className="text-2xl mb-2">🔄</span>
            <span className="font-medium text-sm">Real-time Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizationGallery;