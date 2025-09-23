import React from 'react';

const ChartCard = ({ title, description, data }) => {
  if (!data) return null;

  // Render temperature profile
  const renderTemperatureProfile = () => {
    if (!data.temperature_profile) return null;
    
    return (
      <div className="bg-white rounded-lg p-4 border mb-4">
        <h4 className="font-semibold text-lg mb-3">{title || "Temperature Profile (0-500m)"}</h4>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <div className="space-y-2">
          {Object.entries(data.temperature_profile).map(([depth, temp]) => (
            <div key={depth} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 capitalize w-20">{depth}:</span>
              <div className="flex items-center space-x-2 flex-1 max-w-md">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${(temp / 30) * 100}%` }}
                  ></div>
                </div>
                <span className="font-medium text-sm w-12 text-right">{temp}°C</span>
              </div>
            </div>
          ))}
        </div>
        
        {data.sst && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm">Sea Surface Temperature (SST):</span>
              <span className="font-semibold text-blue-600">{data.sst}°C</span>
            </div>
            {data.anomaly && (
              <div className="flex justify-between items-center text-sm">
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
      <div className="bg-white rounded-lg p-4 border mb-4">
        <h4 className="font-semibold text-lg mb-3">Salinity Profile (0-500m)</h4>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <div className="space-y-2">
          {Object.entries(data.salinity_profile).map(([depth, salinity]) => (
            <div key={depth} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 capitalize w-20">{depth}:</span>
              <div className="flex items-center space-x-2 flex-1 max-w-md">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${((salinity - 34) / 2) * 100}%` }}
                  ></div>
                </div>
                <span className="font-medium text-sm w-12 text-right">{salinity} PSU</span>
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
      <div className="bg-white rounded-lg p-4 border mb-4">
        <h4 className="font-semibold text-lg mb-3">Current Speed and Direction</h4>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <div className="space-y-3">
          {Object.entries(data.currents_profile).map(([depth, current]) => (
            <div key={depth} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 capitalize w-20">{depth}:</span>
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex-1 max-w-md">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Speed: {current.speed} m/s</span>
                    <span>Direction: {current.direction}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(current.speed / 2) * 100}%` }}
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

  // Render map locations
  const renderMapLocations = () => {
    if (!data.locations) return null;
    
    return (
      <div className="bg-white rounded-lg p-4 border mb-4">
        <h4 className="font-semibold text-lg mb-3">ARGO Float Locations</h4>
        <div className="space-y-2">
          {data.locations.map((location, index) => (
            <div key={index} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
              <span className="font-medium">Float {index + 1}</span>
              <span>{location.lat}°N, {location.lon}°E</span>
              <span>{location.temp}°C</span>
              <span>{location.salinity} PSU</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {renderTemperatureProfile()}
      {renderSalinityProfile()}
      {renderCurrentsProfile()}
      {renderMapLocations()}
      
      {/* Action buttons */}
      <div className="flex space-x-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
          Download Data CSV
        </button>
        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-50">
          Ask about this data...
        </button>
      </div>
    </div>
  );
};

export { ChartCard };
export default ChartCard;