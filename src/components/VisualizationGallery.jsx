import React, { useState, useEffect } from 'react';
import { argoData } from '../data/argoData';

const VisualizationGallery = () => {
  const [activeTab, setActiveTab] = useState('temperature');
  const [selectedRegion, setSelectedRegion] = useState('indianOcean');
  const [hoveredData, setHoveredData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('2023');
  const [selectedDepth, setSelectedDepth] = useState('surface');
  const [chartType, setChartType] = useState('line');

  // Mobile state for better UX
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate loading state for better UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeTab, selectedRegion, timeRange, chartType]);

  // Helper to calculate Y position for lines/areas
  const calculateYPosition = (value, minValue, maxValue, chartHeight) => {
    if (maxValue === minValue) return chartHeight / 2;
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

    // Responsive chart dimensions
    const chartHeight = isMobile ? 150 : 200;
    const chartWidth = isMobile ? 400 : 700;
    const paddingLeft = isMobile ? 30 : 40;
    const paddingBottom = isMobile ? 25 : 30;
    const effectiveChartWidth = chartWidth - paddingLeft;
    const effectiveChartHeight = chartHeight - paddingBottom;
    const barWidth = (effectiveChartWidth / data.length) * 0.7;
    const barSpacing = (effectiveChartWidth / data.length) * 0.3;

    // Calculate points for Line and Area charts
    const points = data.map((value, index) => {
      const x = paddingLeft + (index * (effectiveChartWidth / data.length)) + (effectiveChartWidth / data.length) / 2;
      const y = calculateYPosition(value, minValue, maxValue, effectiveChartHeight);
      return `${x},${y}`;
    }).join(' ');

    const areaPoints = `${paddingLeft},${effectiveChartHeight} ${points} ${effectiveChartWidth + paddingLeft},${effectiveChartHeight}`;

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header with enhanced responsive controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4">
          <div className="w-full lg:w-auto">
            <h3 className="text-lg sm:text-xl font-bold capitalize">
              {activeTab === 'currents' ? 'Current Speed' : activeTab} Analysis
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              {selectedRegion.replace('Ocean', ' Ocean')} • {timeRange}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full lg:w-auto justify-start lg:justify-end">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-white shadow-sm flex-1 sm:flex-none min-w-[120px]"
            >
              <option value="indianOcean">Indian Ocean</option>
              <option value="pacificOcean">Pacific Ocean</option>
              <option value="atlanticOcean">Atlantic Ocean</option>
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-white shadow-sm flex-1 sm:flex-none min-w-[100px]"
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="5y">5-Year Trend</option>
            </select>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md flex-1 sm:flex-none whitespace-nowrap">
              📊 Download Report
            </button>
          </div>
        </div>

        {/* Enhanced Monthly Trend Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <div className="xl:col-span-2 bg-white rounded-xl p-4 sm:p-6 border shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
              <h4 className="font-semibold text-base sm:text-lg">Monthly Trends</h4>
              <div className="flex gap-1 sm:gap-2 w-full sm:w-auto">
                {['bar', 'line', 'area'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={`text-xs px-2 sm:px-3 py-1 rounded flex-1 sm:flex-none ${
                      chartType === type 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Chart Container */}
            <div className="relative overflow-x-auto">
              <div 
                className="relative overflow-hidden min-w-[500px] sm:min-w-0"
                style={{ height: chartHeight + paddingBottom }}
              >
                <svg 
                  width="100%" 
                  height="100%" 
                  viewBox={`0 0 ${chartWidth} ${chartHeight + paddingBottom}`} 
                  preserveAspectRatio="none"
                >
                  {/* Y-Axis Grid Lines & Labels */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                    const y = effectiveChartHeight - (ratio * effectiveChartHeight);
                    const value = (minValue + ratio * (maxValue - minValue)).toFixed(1);
                    return (
                      <g key={`y-axis-${i}`}>
                        <line x1={paddingLeft} y1={y} x2={chartWidth} y2={y} stroke="#e5e7eb" strokeDasharray="2,2" />
                        <text x={paddingLeft - 5} y={y + 3} textAnchor="end" fontSize={isMobile ? "8" : "10"} fill="#6b7280">
                          {value}{activeTab === 'temperature' ? '°C' : activeTab === 'salinity' ? 'PSU' : 'm/s'}
                        </text>
                      </g>
                    );
                  })}

                  {/* X-Axis Labels */}
                  {months.map((month, index) => {
                    const x = paddingLeft + (index * (effectiveChartWidth / data.length)) + (effectiveChartWidth / data.length) / 2;
                    return (
                      <text 
                        key={month} 
                        x={x} 
                        y={chartHeight + 15} 
                        textAnchor="middle" 
                        fontSize={isMobile ? "8" : "10"} 
                        fill="#6b7280"
                      >
                        {isMobile ? month.slice(0, 1) : month.slice(0, 3)}
                      </text>
                    );
                  })}

                  {/* Chart rendering based on type */}
                  {chartType === 'bar' && data.map((value, index) => {
                    const height = (value - minValue) / (maxValue - minValue) * effectiveChartHeight;
                    const x = paddingLeft + (index * (effectiveChartWidth / data.length)) + (barSpacing / 2);
                    const y = effectiveChartHeight - height;
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
                      strokeWidth={isMobile ? "2" : "3"}
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
                        r={isMobile ? "3" : "5"}
                        fill="#2563eb"
                        stroke="white"
                        strokeWidth={isMobile ? "1" : "2"}
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

                {/* Hover Tooltip */}
                {hoveredData && (
                  <div
                    className="absolute bg-gray-900 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap z-10"
                    style={{
                      left: `${paddingLeft + (months.indexOf(hoveredData.month) * (effectiveChartWidth / data.length)) + (effectiveChartWidth / data.length) / 2}px`,
                      top: `${calculateYPosition(hoveredData.value, minValue, maxValue, effectiveChartHeight) - 40}px`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="font-semibold">{hoveredData.month}</div>
                    <div>{hoveredData.value}{activeTab === 'temperature' ? '°C' : activeTab === 'salinity' ? 'PSU' : 'm/s'}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 sm:p-6 text-white">
            <h4 className="font-semibold mb-3 sm:mb-4 text-white text-base sm:text-lg">Current Status</h4>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Current Value</span>
                  <span className="font-semibold">
                    {data[data.length - 1]}{activeTab === 'temperature' ? '°C' : activeTab === 'salinity' ? 'PSU' : 'm/s'}
                  </span>
                </div>
                <div className="w-full bg-blue-400 rounded-full h-1.5 sm:h-2 mt-1">
                  <div
                    className="bg-white h-1.5 sm:h-2 rounded-full"
                    style={{ width: `${((data[data.length - 1] - minValue) / (maxValue - minValue)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-xs sm:text-sm">
                <span>Monthly Change</span>
                <span className={`font-semibold ${data[data.length - 1] > data[data.length - 2] ? 'text-green-200' : 'text-red-200'}`}>
                  {data[data.length - 1] > data[data.length - 2] ? '↑' : '↓'}
                  {Math.abs(data[data.length - 1] - data[data.length - 2]).toFixed(1)}
                </span>
              </div>

              <div className="flex justify-between text-xs sm:text-sm">
                <span>Annual Trend</span>
                <span className="font-semibold text-green-200">↑ +2.3%</span>
              </div>

              <button className="w-full bg-white text-blue-600 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors mt-2 sm:mt-4 text-sm">
                View Anomaly Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Depth Profile with Interactive Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 border shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
              <h4 className="font-semibold text-base sm:text-lg">Depth Profile Analysis</h4>
              <select
                value={selectedDepth}
                onChange={(e) => setSelectedDepth(e.target.value)}
                className="border rounded-lg px-2 sm:px-3 py-1.5 text-xs sm:text-sm w-full sm:w-auto"
              >
                <option value="surface">Surface (0-100m)</option>
                <option value="thermocline">Thermocline (100-500m)</option>
                <option value="deep">Deep (500-2000m)</option>
              </select>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {Object.entries(argoData[`${activeTab}Profiles`]?.[selectedRegion] || argoData.temperatureProfiles[selectedRegion] || {}).map(([depth, value]) => {
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
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <span className="font-medium text-gray-700 capitalize text-sm sm:text-base">{depth}:</span>
                      <span className="font-semibold text-sm sm:text-base">
                        {value} {activeTab === 'temperature' ? '°C' : activeTab === 'salinity' ? 'PSU' : 'm/s'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 sm:h-3">
                      <div
                        className={`h-2 sm:h-3 rounded-full transition-all duration-500 group-hover:shadow-lg ${
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
          <div className="bg-white rounded-xl p-4 sm:p-6 border shadow-sm">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Statistical Summary</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">
                    {(data.reduce((a, b) => a + b, 0) / data.length).toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600">Average</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">{maxValue}</div>
                  <div className="text-xs text-gray-600">Maximum</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-red-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-red-600">{minValue}</div>
                  <div className="text-xs text-gray-600">Minimum</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">{data.length}</div>
                  <div className="text-xs text-gray-600">Data Points</div>
                </div>
              </div>

              <div className="border-t pt-3 sm:pt-4">
                <div className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-2">
                  <span>Data Quality</span>
                  <span className="font-semibold text-green-600">Excellent</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                  <div className="bg-green-500 h-1.5 sm:h-2 rounded-full" style={{ width: '95%' }}></div>
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
    const tsData = argoData.tsDiagramData[selectedRegion] || [];
    const minSalinity = 34;
    const maxSalinity = 36.2;
    const minTemp = 8;
    const maxTemp = 30;

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4">
          <div className="w-full lg:w-auto">
            <h3 className="text-lg sm:text-xl font-bold">Temperature-Salinity Diagram</h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              {selectedRegion.replace('Ocean', ' Ocean')} • Water Mass Characteristics
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full lg:w-auto">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-white shadow-sm flex-1 lg:flex-none"
            >
              <option value="indianOcean">Indian Ocean</option>
              <option value="pacificOcean">Pacific Ocean</option>
            </select>
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm hover:from-green-700 hover:to-emerald-700 transition-all shadow-md flex-1 lg:flex-none whitespace-nowrap">
              📈 Download TS Data
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 border shadow-sm">
          <div className="h-64 sm:h-96 relative overflow-x-auto">
            <div className="min-w-[500px] sm:min-w-0">
              <svg width="100%" height="100%" viewBox={`0 0 ${1000} ${500}`} preserveAspectRatio="xMidYMid meet" className="border-b border-l">
                {/* Grid lines and content remains the same but with responsive adjustments */}
                {[...Array(6)].map((_, i) => (
                  <line key={`h-${i}`} x1="0" y1={(i / 5) * 100 + '%'} x2="100%" y2={(i / 5) * 100 + '%'} stroke="#e5e7eb" />
                ))}
                {[...Array(8)].map((_, i) => (
                  <line key={`v-${i}`} x1={(i / 7) * 100 + '%'} y1="0" x2={(i / 7) * 100 + '%'} y2="100%" stroke="#e5e7eb" />
                ))}

                {tsData.map((point, index) => {
                  const x = ((point.salinity - minSalinity) / (maxSalinity - minSalinity)) * 100;
                  const y = 100 - ((point.temp - minTemp) / (maxTemp - minTemp)) * 100;
                  const depthColor = point.depth === 'surface' ? '#3b82f6' :
                                   point.depth === 'thermocline' ? '#10b981' : '#8b5cf6';

                  return (
                    <g key={index}>
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r={isMobile ? "6" : "8"}
                        fill={depthColor}
                        stroke="white"
                        strokeWidth={isMobile ? "1" : "2"}
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
                        fontSize={isMobile ? "8" : "10"}
                        fontWeight="bold"
                      >
                        {index + 1}
                      </text>
                    </g>
                  );
                })}

                {hoveredData && (
                  <foreignObject
                    x={((hoveredData.salinity - minSalinity) / (maxSalinity - minSalinity)) * 100 + '%'}
                    y={100 - ((hoveredData.temp - minTemp) / (maxTemp - minTemp)) * 100 - 60 + '%'}
                    width="120"
                    height="80"
                    style={{ overflow: 'visible', pointerEvents: 'none' }}
                  >
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      className="bg-gray-900 text-white p-2 rounded-lg text-xs shadow-xl whitespace-nowrap"
                      style={{ transform: 'translateX(-50%)' }}
                    >
                      <div className="font-semibold capitalize">{hoveredData.depth} Water</div>
                      <div>Temp: {hoveredData.temp}°C</div>
                      <div>Salinity: {hoveredData.salinity} PSU</div>
                    </div>
                  </foreignObject>
                )}
              </svg>
            </div>

            <div className="absolute -bottom-6 left-0 right-0 flex justify-between p-2 text-xs sm:text-sm text-gray-600">
              <span className="absolute left-0 bottom-0 rotate-[-90deg] origin-bottom-left ml-[-30px] mt-[100px] text-center w-[100px]">
                Temperature (°C)
              </span>
              <span className="absolute bottom-0 right-0 mr-[100px]">Salinity (PSU) →</span>
            </div>
          </div>

          {/* Enhanced Information Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
            <div className="lg:col-span-2">
              <h4 className="font-semibold mb-3 text-base sm:text-lg">Depth Point Analysis</h4>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                {tsData.map((point, index) => (
                  <div key={index} className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div
                      className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3"
                      style={{
                        backgroundColor: point.depth === 'surface' ? '#3b82f6' :
                                       point.depth === 'thermocline' ? '#10b981' : '#8b5cf6'
                      }}
                    ></div>
                    <div className="flex-1">
                      <div className="font-medium capitalize text-sm sm:text-base">{point.depth}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{point.temp}°C, {point.salinity} PSU</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-3 sm:p-4 text-white">
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Water Mass Characteristics</h4>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { label: 'Surface Water', desc: 'Warm, Low Salinity', width: '30%' },
                  { label: 'Intermediate', desc: 'Cooler, Higher Salinity', width: '50%' },
                  { label: 'Deep Water', desc: 'Cold, Highest Salinity', width: '20%' }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>{item.label}</span>
                      <span>{item.desc}</span>
                    </div>
                    <div className="w-full bg-green-400 rounded-full h-1 mt-1">
                      <div className="bg-white h-1 rounded-full" style={{ width: item.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mobile menu button
  const MobileMenuButton = () => (
    <button
      onClick={() => setShowMobileMenu(!showMobileMenu)}
      className="lg:hidden bg-blue-600 text-white p-2 rounded-lg"
    >
      {showMobileMenu ? '✕' : '☰'}
    </button>
  );

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4">
        <div className="w-full lg:w-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Ocean Data Visualization Dashboard
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Interactive analysis of oceanographic parameters and trends
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto justify-between lg:justify-end">
          <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
            July 2023 Data
          </span>
          <MobileMenuButton />
          <button className="text-gray-600 hover:text-gray-800 hidden lg:block">⚙️</button>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className={`bg-white rounded-xl p-1 sm:p-2 shadow-sm ${showMobileMenu ? 'block' : 'hidden lg:block'}`}>
        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1">
          {[
            { id: 'temperature', label: '🌡️ Temperature', color: 'red' },
            { id: 'salinity', label: '🧂 Salinity', color: 'green' },
            { id: 'currents', label: '🌊 Currents', color: 'blue' },
            { id: 'ts-diagram', label: '📈 TS Diagram', color: 'purple' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowMobileMenu(false);
              }}
              className={`px-3 sm:px-4 py-2 sm:py-3 font-medium capitalize rounded-lg transition-all duration-300 text-sm sm:text-base ${
                activeTab === tab.id
                  ? `bg-${tab.color}-100 text-${tab.color}-600 shadow-md`
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isMobile ? tab.label.replace(' ', '\n') : tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-40 sm:h-64">
          <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="py-2 sm:py-4 transition-opacity duration-300">
        {!isLoading && renderChart()}
      </div>

      {/* Enhanced Action Panel */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border shadow-sm">
        <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Quick Actions & Export</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: '📊', label: 'Compare Regions' },
            { icon: '📥', label: 'Export Data' },
            { icon: '📋', label: 'Generate Report' },
            { icon: '🔄', label: 'Real-time Data' }
          ].map((action, index) => (
            <button key={index} className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
              <span className="text-xl sm:text-2xl mb-1 sm:mb-2">{action.icon}</span>
              <span className="font-medium text-xs sm:text-sm text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualizationGallery;