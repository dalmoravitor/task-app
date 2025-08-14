// Quick test script to verify API connectivity
const testAPI = async () => {
  try {
    console.log('Testing API connection...');
    
    const response = await fetch('http://localhost:3001/health');
    const data = await response.json();
    
    console.log('API Response:', data);
    console.log('✅ API is working!');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('Make sure the auth-api server is running on port 3001');
  }
};

testAPI();
