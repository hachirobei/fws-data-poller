const axios = require('axios');
require('dotenv').config();

exports.fetchFloodWarningData = async () => {
    try {
        const response = await axios.get(process.env.FLOOD_API_URL);
        console.log('Response Data:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
};

exports.updateFloodDataInService = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        console.log('Response Data:', response.data); // Log the response data
        return response.status;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
};