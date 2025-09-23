const API_BASE = 'http://localhost:8000';  // Changed from 127.0.0.1 to localhost

export const floatchatApi = {
  async sendQuery(message, userId = 'anonymous') {
    try {
      const response = await fetch(`${API_BASE}/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',  // Explicitly set CORS mode
        body: JSON.stringify({ message, user_id: userId }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async getARGOFloats() {
    try {
      const response = await fetch(`${API_BASE}/api/argo/floats`, {
        mode: 'cors',  // Explicitly set CORS mode
      });
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};