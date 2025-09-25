import React from 'react';

const ChartCard = ({ title, description, data }) => {
  if (!data) return null;

  // Render temperature profile
  const renderTemperatureProfile = () => {
    if (!data.temperature_profile) return null;
    
    return (
      <div className="bg-white rounded-lg p-3 sm:p-4 border mb-3 sm:mb-4">
        <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">{title || "Temperature Profile (0-500m)"}</h4>
        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{description}</p>
        
        <div className="space-y-2">
          {Object.entries(data.temperature_profile).map(([depth, temp]) => (
            <div key={depth} className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-3">
              <span className="text-xs sm:text-sm text-gray-700 capitalize w-16 xs:w-20">{depth}:</span>
              <div className="flex items-center space-x-2 flex-1 w-full xs:max-w-md">
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                  <div 
                    className="bg-red-500 h-1.5 sm:h-2 rounded-full" 
                    style={{ width: `${Math.min((temp / 30) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="font-medium text-xs sm:text-sm w-10 xs:w-12 text-right">{temp}°C</span>
              </div>
            </div>
          ))}
        </div>
        
        {data.sst && (
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t">
            <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1 xs:gap-0">
              <span className="text-xs sm:text-sm">Sea Surface Temperature (SST):</span>
              <span className="font-semibold text-blue-600 text-sm sm:text-base">{data.sst}°C</span>
            </div>
            {data.anomaly && (
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1 xs:gap-0 text-xs sm:text-sm">
                <span>Anomaly vs July 2023:</span>
                <span className={data.anomaly > 0 ? "text-red-600" : "text-green-600"}>
                  {data.anomaly > 0 ? "+" : ""}{data.anomaly}°C
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Render salinity profile
  const renderSalinityProfile = () => {
    if (!data.salinity_profile) return null;
    
    return (
      <div className="bg-white rounded-lg p-3 sm:p-4 border mb-3 sm:mb-4">
        <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">Salinity Profile (0-500m)</h4>
        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{description}</p>
        
        <div className="space-y-2">
          {Object.entries(data.salinity_profile).map(([depth, salinity]) => (
            <div key={depth} className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-3">
              <span className="text-xs sm:text-sm text-gray-700 capitalize w-16 xs:w-20">{depth}:</span>
              <div className="flex items-center space-x-2 flex-1 w-full xs:max-w-md">
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                  <div 
                    className="bg-green-500 h-1.5 sm:h-2 rounded-full" 
                    style={{ width: `${Math.min(((salinity - 34) / 2) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="font-medium text-xs sm:text-sm w-10 xs:w-12 text-right">{salinity} PSU</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render currents profile
  const renderCurrentsProfile = () => {
    if (!data.currents_profile) return null;
    
    return (
      <div className="bg-white rounded-lg p-3 sm:p-4 border mb-3 sm:mb-4">
        <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">Current Speed and Direction</h4>
        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{description}</p>
        
        <div className="space-y-3">
          {Object.entries(data.currents_profile).map(([depth, current]) => (
            <div key={depth} className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-3">
              <span className="text-xs sm:text-sm text-gray-700 capitalize w-16 xs:w-20">{depth}:</span>
              <div className="flex flex-col xs:flex-row xs:items-center space-y-2 xs:space-y-0 xs:space-x-4 flex-1 w-full">
                <div className="flex-1 w-full xs:max-w-md">
                  <div className="flex flex-col xs:flex-row justify-between text-xs mb-1 gap-1 xs:gap-0">
                    <span>Speed: {current.speed} m/s</span>
                    <span>Direction: {current.direction}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-blue-500 h-1.5 sm:h-2 rounded-full" 
                      style={{ width: `${Math.min((current.speed / 2) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render map locations - Made fully responsive
  const renderMapLocations = () => {
    if (!data.locations) return null;
    
    return (
      <div className="bg-white rounded-lg p-3 sm:p-4 border mb-3 sm:mb-4">
        <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">ARGO Float Locations</h4>
        <div className="space-y-2">
          {data.locations.map((location, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4 p-2 bg-gray-50 rounded text-xs sm:text-sm">
              <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                <span className="font-medium min-w-[60px]">Float {index + 1}</span>
                <span className="text-gray-600">{location.lat}°N, {location.lon}°E</span>
              </div>
              <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                <span className="text-blue-600">{location.temp}°C</span>
                <span className="text-green-600">{location.salinity} PSU</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {renderTemperatureProfile()}
      {renderSalinityProfile()}
      {renderCurrentsProfile()}
      {renderMapLocations()}
      
      {/* Action buttons - Responsive layout */}
      <div className="flex flex-col xs:flex-row gap-2 xs:space-x-2">
        <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-blue-700 transition-colors flex-1 xs:flex-none">
          Download Data CSV
        </button>
        <button className="border border-blue-600 text-blue-600 px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-blue-50 transition-colors flex-1 xs:flex-none">
          Ask about this data...
        </button>
      </div>
    </div>
  );
};

export { ChartCard };
export default ChartCard;