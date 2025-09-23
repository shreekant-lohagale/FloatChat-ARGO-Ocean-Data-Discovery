// src/data/argoData.js
export const argoData = {
  temperatureProfiles: {
    indianOcean: {
      surface: 28.5, '100m': 22.1, '200m': 18.3, '300m': 15.2, '400m': 12.8, '500m': 10.5
    },
    pacificOcean: {
      surface: 25.3, '100m': 20.1, '200m': 16.8, '300m': 13.5, '400m': 10.2, '500m': 8.1
    },
    atlanticOcean: {
      surface: 26.8, '100m': 21.5, '200m': 17.2, '300m': 14.1, '400m': 11.3, '500m': 9.2
    }
  },
  salinityProfiles: {
    indianOcean: {
      surface: 34.8, '100m': 35.2, '200m': 35.5, '300m': 35.7, '400m': 35.9, '500m': 36.1
    },
    pacificOcean: {
      surface: 34.9, '100m': 35.3, '200m': 35.6, '300m': 35.8, '400m': 36.0, '500m': 36.2
    }
  },
  currentsData: {
    indianOcean: {
      surface: { speed: 1.2, direction: 'Westward' },
      '100m': { speed: 0.8, direction: 'Southwest' },
      '200m': { speed: 0.5, direction: 'Northwest' }
    },
    pacificOcean: {
      surface: { speed: 1.5, direction: 'Eastward' },
      '100m': { speed: 1.1, direction: 'Northeast' },
      '200m': { speed: 0.7, direction: 'Southeast' }
    }
  },
  tsDiagramData: {
    indianOcean: [
      { temp: 28.5, salinity: 34.8, depth: 'surface' },
      { temp: 22.1, salinity: 35.2, depth: '100m' },
      { temp: 18.3, salinity: 35.5, depth: '200m' },
      { temp: 15.2, salinity: 35.7, depth: '300m' },
      { temp: 12.8, salinity: 35.9, depth: '400m' },
      { temp: 10.5, salinity: 36.1, depth: '500m' }
    ],
    pacificOcean: [
      { temp: 25.3, salinity: 34.9, depth: 'surface' },
      { temp: 20.1, salinity: 35.3, depth: '100m' },
      { temp: 16.8, salinity: 35.6, depth: '200m' },
      { temp: 13.5, salinity: 35.8, depth: '300m' },
      { temp: 10.2, salinity: 36.0, depth: '400m' },
      { temp: 8.1, salinity: 36.2, depth: '500m' }
    ]
  },
  monthlyData: {
    temperature: [28.5, 28.7, 29.1, 29.8, 30.2, 29.5, 28.9, 28.3, 28.1, 28.4, 28.6, 28.3],
    salinity: [34.8, 34.9, 35.0, 35.1, 35.2, 35.1, 34.9, 34.8, 34.7, 34.8, 34.9, 34.8],
    currents: [1.2, 1.3, 1.1, 1.0, 0.9, 1.1, 1.4, 1.5, 1.3, 1.2, 1.1, 1.0],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};