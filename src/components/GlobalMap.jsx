import React, { useState, useCallback } from 'react';
import { argoData } from '../data/argoData';

const GlobalMap = () => {
  const [selectedRegion, setSelectedRegion] = useState('indianOcean');
  const [selectedFloat, setSelectedFloat] = useState(null);
  const [mapView, setMapView] = useState('map'); // 'map' or 'satellite'
  const [zoomLevel, setZoomLevel] = useState(1);

  const regions = {
    indianOcean: {
      name: "Indian Ocean",
      center: [10, 80],
      bounds: [[-30, 30], [120, 30], [120, -30], [-30, -30]],
      floats: [
        { id: 1, lat: 15.5, lon: 73.8, temp: 28.5, salinity: 34.8, region: "Arabian Sea", depth: 2000, lastUpdate: "2 days ago" },
        { id: 2, lat: 13.2, lon: 80.3, temp: 29.1, salinity: 34.9, region: "Bay of Bengal", depth: 1800, lastUpdate: "1 day ago" },
        { id: 3, lat: 18.9, lon: 72.8, temp: 27.8, salinity: 34.7, region: "Western India", depth: 2500, lastUpdate: "3 days ago" },
        { id: 4, lat: -5.0, lon: 85.0, temp: 26.5, salinity: 35.1, region: "Equatorial Region", depth: 3000, lastUpdate: "5 hours ago" }
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    pacificOcean: {
      name: "Pacific Ocean",
      center: [0, -160],
      bounds: [[60, -80], [-60, -80], [-60, 80], [60, 80]],
      floats: [
        { id: 5, lat: 20.0, lon: 160.0, temp: 25.3, salinity: 34.9, region: "Western Pacific", depth: 4000, lastUpdate: "6 hours ago" },
        { id: 6, lat: 0.0, lon: 180.0, temp: 27.8, salinity: 35.2, region: "Central Pacific", depth: 3500, lastUpdate: "1 day ago" },
        { id: 7, lat: -20.0, lon: 200.0, temp: 22.1, salinity: 35.5, region: "South Pacific", depth: 2800, lastUpdate: "2 days ago" }
      ],
      color: 'from-green-500 to-emerald-600'
    },
    atlanticOcean: {
      name: "Atlantic Ocean",
      center: [25, -30],
      bounds: [[60, -80], [-60, -80], [-60, 20], [60, 20]],
      floats: [
        { id: 8, lat: 25.0, lon: 300.0, temp: 26.8, salinity: 35.3, region: "North Atlantic", depth: 3200, lastUpdate: "4 hours ago" },
        { id: 9, lat: 0.0, lon: 330.0, temp: 28.2, salinity: 35.0, region: "Equatorial Atlantic", depth: 2700, lastUpdate: "12 hours ago" }
      ],
      color: 'from-purple-500 to-indigo-600'
    }
  };

  const currentRegion = regions[selectedRegion];

  // Convert coordinates to map position
  const getFloatPosition = (lat, lon) => {
    const x = ((lon + 180) % 360) / 360 * 100;
    const y = (90 - lat) / 180 * 100;
    return { x, y };
  };

  const handleFloatClick = (float) => {
    setSelectedFloat(selectedFloat?.id === float.id ? null : float);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const FloatMarker = ({ float, isSelected }) => {
    const position = getFloatPosition(float.lat, float.lon);
    
    return (
      <div 
        className={`absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          isSelected 
            ? 'bg-red-600 scale-150 z-10 shadow-lg' 
            : 'bg-red-500 hover:scale-125 hover:bg-red-400'
        } ${isSelected ? 'animate-pulse' : ''}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
        }}
        onClick={() => handleFloatClick(float)}
        title={`Float ${float.id}: ${float.temp}°C, ${float.salinity} PSU`}
      >
        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
          {float.id}
        </div>
        
        {/* Tooltip for selected float */}
        {isSelected && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-xl p-3 z-20">
            <div className="text-sm font-semibold text-gray-800">Float #{float.id}</div>
            <div className="text-xs text-gray-600 mb-2">{float.region}</div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div>Temp:</div><div className="font-semibold">{float.temp}°C</div>
              <div>Salinity:</div><div className="font-semibold">{float.salinity} PSU</div>
              <div>Depth:</div><div className="font-semibold">{float.depth}m</div>
              <div>Updated:</div><div className="font-semibold">{float.lastUpdate}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Simple map background component
  const MapBackground = () => {
    if (mapView === 'satellite') {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900">
          {/* Simulated satellite view with depth variations */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.2) 0%, transparent 40%)`,
            }}></div>
          </div>
        </div>
      );
    }

    // Default map view
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-500">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}></div>
        </div>
        
        {/* Continent outlines (simplified) */}
        <div className="absolute inset-0">
          {/* Simplified land masses */}
          <div className="absolute w-1/4 h-1/3 top-1/4 left-1/4 bg-green-100 opacity-20 rounded-lg"></div>
          <div className="absolute w-1/6 h-1/4 top-1/3 left-2/3 bg-green-100 opacity-20 rounded-lg"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Interactive Global Map</h2>
          <p className="text-gray-600">Real-time ARGO float monitoring and data visualization</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setMapView('map')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                mapView === 'map' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Map View
            </button>
            <button
              onClick={() => setMapView('satellite')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                mapView === 'satellite' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Satellite
            </button>
          </div>
          
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="indianOcean">Indian Ocean</option>
            <option value="pacificOcean">Pacific Ocean</option>
            <option value="atlanticOcean">Atlantic Ocean</option>
          </select>
        </div>
      </div>

      {/* Map Container with Controls */}
      <div className="bg-white rounded-xl border-2 border-gray-200 h-96 relative overflow-hidden">
        <MapBackground />
        
        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 z-10">
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleZoomIn}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              <span className="text-lg font-bold">+</span>
            </button>
            <button 
              onClick={handleZoomOut}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              <span className="text-lg font-bold">-</span>
            </button>
          </div>
        </div>

        {/* Map Title */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg z-10">
          <div className="font-semibold">{currentRegion.name}</div>
          <div className="text-xs opacity-75">{currentRegion.floats.length} Active Floats</div>
        </div>

        {/* Float Markers */}
        <div className="absolute inset-0" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}>
          {currentRegion.floats.map((float) => (
            <FloatMarker 
              key={float.id} 
              float={float} 
              isSelected={selectedFloat?.id === float.id}
            />
          ))}
        </div>

        {/* Coordinates Display */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs">
          Zoom: {zoomLevel.toFixed(1)}x • {mapView === 'satellite' ? 'Satellite View' : 'Map View'}
        </div>
      </div>

      {/* Selected Float Details */}
      {selectedFloat && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg text-blue-800">Float #{selectedFloat.id} Details</h3>
            <button 
              onClick={() => setSelectedFloat(null)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-white rounded p-3 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{selectedFloat.temp}°C</div>
              <div className="text-sm text-gray-600">Temperature</div>
            </div>
            <div className="text-center bg-white rounded p-3 shadow-sm">
              <div className="text-2xl font-bold text-green-600">{selectedFloat.salinity} PSU</div>
              <div className="text-sm text-gray-600">Salinity</div>
            </div>
            <div className="text-center bg-white rounded p-3 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{selectedFloat.depth}m</div>
              <div className="text-sm text-gray-600">Depth</div>
            </div>
            <div className="text-center bg-white rounded p-3 shadow-sm">
              <div className="text-2xl font-bold text-orange-600">{selectedFloat.lastUpdate}</div>
              <div className="text-sm text-gray-600">Last Update</div>
            </div>
          </div>
        </div>
      )}

      {/* Region Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-4 border col-span-2">
          <h3 className="font-semibold text-lg mb-3">{currentRegion.name} Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentRegion.floats.length}</div>
              <div className="text-sm text-gray-600">Active Floats</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {(currentRegion.floats.reduce((sum, f) => sum + f.temp, 0) / currentRegion.floats.length).toFixed(1)}°C
              </div>
              <div className="text-sm text-gray-600">Avg Temperature</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(currentRegion.floats.reduce((sum, f) => sum + f.salinity, 0) / currentRegion.floats.length).toFixed(1)} PSU
              </div>
              <div className="text-sm text-gray-600">Avg Salinity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{currentRegion.floats.length * 12}</div>
              <div className="text-sm text-gray-600">Data Points</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-4 border">
          <h3 className="font-semibold text-lg mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
              Download Region Data
            </button>
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
              Generate Report
            </button>
            <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm">
              Compare with Previous Year
            </button>
          </div>
        </div>
      </div>

      {/* Float List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentRegion.floats.map((float) => (
          <div 
            key={float.id} 
            className={`bg-white rounded-lg p-4 border hover:shadow-md transition-all cursor-pointer ${
              selectedFloat?.id === float.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => handleFloatClick(float)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-blue-700">Float #{float.id}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                float.lastUpdate.includes('hour') ? 'bg-green-100 text-green-800' :
                float.lastUpdate.includes('day') ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {float.lastUpdate}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Location:</span>
                <div className="font-semibold">{float.region}</div>
              </div>
              <div>
                <span className="text-gray-600">Coordinates:</span>
                <div className="font-semibold">{float.lat}°, {float.lon}°</div>
              </div>
              <div>
                <span className="text-gray-600">Temperature:</span>
                <div className="font-semibold">{float.temp}°C</div>
              </div>
              <div>
                <span className="text-gray-600">Salinity:</span>
                <div className="font-semibold">{float.salinity} PSU</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalMap;