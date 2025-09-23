# FloatChat - ARGO Ocean Data Discovery

A full-stack application for exploring and visualizing ARGO oceanographic data through an interactive chat interface and dashboard.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Dashboard Design Concepts](#dashboard-design-concepts)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

## 🚀 Project Overview

FloatChat is a comprehensive ocean data exploration platform that combines:
- **AI-powered chat interface** for natural language queries about ARGO float data
- **Interactive global map** showing real-time float locations and data
- **Advanced visualization gallery** with multiple chart types and ocean parameters
- **Dashboard interface** for comprehensive data analysis

### Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI (Python)
- **Data**: Mock ARGO float data with realistic oceanographic parameters
- **Visualization**: Custom SVG charts, interactive maps, TS diagrams

## 📁 Project Structure

```

floatchat-app/
├── backend/
│   ├── venv/                 \# Python Virtual Environment
│   ├── main.py               \# FastAPI application
│   └── requirements.txt      \# Python dependencies
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── floatchatApi.js    \# API communication layer
    │   ├── components/
    │   │   ├── ChatAssistant.jsx   \# Main chat interface (previously ChatPanel.jsx in discussion)
    │   │   ├── ChatMessage.jsx         \# Individual message component
    │   │   ├── ChartCard.jsx           \# Data visualization cards
    │   │   ├── DataSummary.jsx         \# Ocean data summary cards
    │   │   ├── GlobalMap.jsx           \# Interactive world map
    │   │   ├── Header.jsx              \# Application header
    │   │   ├── SuggestedQuestions.jsx  \# Quick question buttons
    │   │   └── VisualizationGallery.jsx \# Advanced chart gallery
    │   ├── data/
    │   │   └── argoData.js        \# Mock oceanographic data
    │   ├── App.jsx                \# Main application component
    │   ├── App.css                \# Application styles
    │   ├── index.css              \# Global styles
    │   └── main.jsx               \# React entry point
    ├── index.html                 \# HTML entry point
    ├── package.json               \# Node.js dependencies
    ├── tailwind.config.js         \# Tailwind configuration
    └── vite.config.js             \# Vite configuration

````

## ✨ Features

### Core Functionality
- **Natural Language Query Processing**: Ask questions like "Show temperature near India" or "Display salinity data"
- **Multi-Parameter Support**: Temperature, salinity, ocean currents, TS diagrams
- **Interactive Visualizations**: Bar, line, and area charts with hover effects
- **Real-time Map**: Clickable float markers with detailed popups
- **Responsive Design**: Works on desktop and mobile devices

### Data Parameters
- **Temperature Profiles**: Surface to 500m depth measurements
- **Salinity Data**: Practical Salinity Units (PSU) across depths
- **Current Patterns**: Speed and direction at various depths
- **TS Diagrams**: Temperature-Salinity relationships for water mass analysis
- **Regional Data**: Indian Ocean, Pacific Ocean, Atlantic Ocean coverage

### Visualization Types
- **Monthly Trends**: 12-month data with interactive chart switching (Bar, Line, Area)
- **Depth Profiles**: Vertical ocean parameter distributions
- **Geospatial Maps**: Float locations with real-time data
- **Statistical Summaries**: Averages, extremes, and data quality metrics
- **Comparative Analysis**: Region-to-region and year-to-year comparisons

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
    *Required dependencies*: `fastapi`, `uvicorn[standard]`, `python-dotenv`, `openai` (or other LLM library). Add other data processing libraries (e.g., `netCDF4`, `xarray`, `numpy`, `pandas`) as needed for real data integration.

4. **Start the backend server**:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   Backend will be available at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal):
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Frontend will be available at: `http://localhost:5173`

## 🔌 API Documentation

### Endpoints

#### `POST /api/query`
Process natural language queries about ocean data

**Request Body Example (Pydantic Model `Query`):**
```python
from pydantic import BaseModel

class Query(BaseModel):
    text: str
    # You might expand this with 'user_id', 'context', etc.
````

```json
{
  "text": "show temperature data for Indian Ocean"
}
```

**Response Example (Current Placeholder):**

```json
{
  "response": "AI received: 'show temperature data for Indian Ocean'. This is a placeholder response.",
  "chart_data": null
}
```

**Expected Full Response (Future):**

```json
{
  "status": "success",
  "query": "show temperature data for Indian Ocean",
  "response": "Here's the temperature profile for ARGO floats near India...",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "data": {
    "temperature_profile": {
      "surface": 28.5,
      "100m": 22.1,
      "200m": 18.3,
      "300m": 15.2,
      "400m": 12.8,
      "500m": 10.5
    },
    "sst": 29.2,
    "anomaly": 0.8,
    "locations": [] // Example array of float locations
  },
  "visualization": {
    "type": "temperature_profile",
    "title": "Temperature Profile (0-500m)",
    "description": "ARGO floats near India - July 2025"
  }
}
```

#### `GET /`

Health check endpoint returns API status.

**Response:**

```json
{
  "message": "Welcome to FloatChat FastAPI Backend!"
}
```

## 🎨 Dashboard Design Concepts

Throughout development, two main dashboard design concepts were explored to guide the UI/UX:

### 1\. High-Fidelity Concept

A clean, professional design featuring a prominent conversational AI panel on the left and a dynamic visualization area on the right. This concept emphasizes clarity and ease of interaction, providing a focused view for chat-driven data exploration.

### 2\. Detailed Info-Rich Concept

An expansion of the high-fidelity design, this concept incorporates more specific data points, granular chart controls (e.g., for time ranges, regions, and chart types), and clear indicators for data quality and real-time status. It aims to provide a comprehensive analytical workspace without overwhelming the user. Key elements include:

  - Chat input and AI responses
  - Suggested questions for quick exploration
  - Global map with interactive toggles and a time slider
  - Dynamic visualization gallery supporting multiple chart types (Bar, Line, Area)
  - Statistical summaries and depth profiles
  - Temperature-Salinity (TS) diagrams for water mass analysis

## 🐛 Troubleshooting

### Common Issues

#### Backend CORS Errors

**Problem**: Frontend can't connect to backend API due to Cross-Origin Resource Sharing issues.
**Solution**: Ensure CORS is properly configured in `main.py` with `allow_origins` including your frontend's URL.

```python
# main.py - CORS configuration
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",  # Your React frontend's address
    "[http://127.0.0.1:5173](http://127.0.0.1:5173)",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Frontend CSS `@import` Order Error

**Problem**: `[vite:css][postcss] @import must precede all other statements...`
**Solution**: Ensure CSS `@import` rules (like for Leaflet) are at the very top of your `src/index.css` file, before any `@tailwind` directives.

```css
/* src/index.css - Correct order */
@import 'leaflet/dist/leaflet.css'; /* Must be first */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ... other styles ... */
```

#### Component Default Export Errors

**Problem**: `Uncaught SyntaxError: The requested module '...' does not provide an export named 'default'`
**Solution**: Ensure all React components intended for default import (`import MyComponent from './MyComponent'`) are using `export default MyComponent;`.

```jsx
// Correct Component Export (e.g., in ChatAssistant.jsx)
import React from 'react';
const ChatAssistant = () => { /* ... */ };
export default ChatAssistant;

// Incorrect (if expecting default import)
// export const ChatAssistant = () => { /* ... */ };
```

#### Port Conflicts

**Problem**: Either the backend (default 8000) or frontend (default 5173) port is already in use by another application.
**Solution**: Change the port in the respective configuration or command.

```bash
# Backend - use a different port for uvicorn
uvicorn main:app --reload --port 8001

# Frontend - update vite.config.js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174 // Use a different port
  }
});
```

### Debugging Tips

1.  **Verify Server Status**: Always confirm that both your FastAPI backend and React frontend development servers are running without errors in their respective terminals.
2.  **Browser Developer Tools**:
      * **Console Tab**: Check for any JavaScript errors on the frontend.
      * **Network Tab**: Monitor API requests to the backend (`http://localhost:8000/api/query`). Look for failed requests (e.g., 4xx or 5xx status codes) and inspect their response bodies for more details.
3.  **Backend Logs**: Keep an eye on your backend terminal for any Python traceback errors when API calls are made.
4.  **API Testing Tools**: Use tools like `curl`, Postman, or Insomnia to directly test your backend endpoints, isolating potential issues from the frontend.

## 🔮 Future Enhancements

### Planned Features

  - **Real Data Integration**: Connect to actual ARGO float API endpoints (e.g., from [Copernicus Marine Service](https://marine.copernicus.eu/)) for live data.
  - **User Authentication**: Implement user login/registration for personalized dashboards and query history.
  - **Advanced Analytics**: Integrate machine learning models for anomaly detection, predictive analysis, and trend forecasting.
  - **Export Capabilities**: Allow users to download charts as images (PNG, SVG) and data as CSV/JSON, or generate comprehensive PDF reports.
  - **Mobile App**: Explore a React Native version for field researchers and on-the-go data access.

### Technical Improvements

  - **Database Integration**: Utilize a relational database like PostgreSQL to store user profiles, query history, saved visualizations, and metadata.
  - **Caching Layer**: Implement Redis or similar caching mechanisms to reduce redundant data processing and improve API response times.
  - **WebSocket Support**: Add WebSocket functionality for real-time data streaming and instant updates on the map or charts.
  - **Docker Deployment**: Create Dockerfiles and a `docker-compose.yml` for easy containerized deployment of both frontend and backend.
  - **LLM Integration**: Implement a robust RAG (Retrieval Augmented Generation) system for the chat assistant to query and summarize oceanographic data more effectively.

## 📊 Data Sources

Currently, the application uses mock data (`frontend/src/data/argoData.js`) for development and demonstration purposes. Future integrations are planned with:

  - **ARGO Float Network**: Directly access global ocean observation data from the ARGO program.
  - **Copernicus Marine Service**: Leverage their extensive catalogue of satellite and in-situ ocean data products.
  - **NOAA Ocean Data**: Explore historical and real-time oceanographic datasets from NOAA.
  - **NASA Ocean Biology**: Integrate data related to biological and chemical ocean parameters.

## 🤝 Contributing

We welcome contributions\! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch: `git checkout -b feature/your-feature-name`
3.  Make your changes and commit them with descriptive messages: `git commit -am 'Add new feature: [description]'`
4.  Push your branch to your forked repository: `git push origin feature/your-feature-name`
5.  Open a Pull Request to the main repository.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## 🙏 Acknowledgments

  - The **ARGO Program** for their invaluable global ocean observation data.
  - The **FastAPI** and **React** communities for providing excellent frameworks and comprehensive documentation.
  - **Tailwind CSS** for empowering rapid and responsive UI development.
  - The broader **Oceanographic Research Community** for advancing our understanding of the oceans and establishing critical data standards.

-----

**FloatChat** - Making ocean data exploration accessible and intuitive through conversational AI and powerful visualizations.

```
```