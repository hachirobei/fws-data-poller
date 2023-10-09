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

/**
 * Sends flood data in chunks to a specified URL.
 * @param {string} url - The endpoint to send data to.
 * @param {Array} data - The data to send.
 * @param {number} [chunkSize=100] - The size of each chunk.
 * @returns {Object} An object indicating the operation's status and the number of chunks sent.
 * @throws Will throw an error if a request fails.
 */
exports.updateFloodDataInService = async (url, data, chunkSize = 100) => {
    try {
        const chunks = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            chunks.push(data.slice(i, i + chunkSize));
        }

        for (const chunk of chunks) {
            const response = await axios.post(url, chunk, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(`Chunk sent. Response status: ${response.status}`);
        }
        
        return { status: 'success', chunksSent: chunks.length };

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
