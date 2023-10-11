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
    // Create chunks
    const chunks = Array.from({ length: Math.ceil(data.length / chunkSize) }, (_, index) => {
        return data.slice(index * chunkSize, (index + 1) * chunkSize);
    });

    const results = [];

    // Send chunks
    for (const [index, chunk] of chunks.entries()) {
        try {
            const response = await axios.post(url, chunk, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(`Chunk ${index + 1} sent with status: ${response.status}`);
            results.push({ chunkIndex: index + 1, responseStatus: response.status });
        } catch (error) {
            console.error(`Error sending chunk ${index + 1}:`, error);
            results.push({ chunkIndex: index + 1, error: error.message });
        }
    }

    const successfulRequests = results.filter(r => r.responseStatus === 200).length;

    if (successfulRequests === chunks.length) {
        return { status: 'success', chunksSent: chunks.length, details: results };
    } else {
        return { status: 'partial_success', chunksSent: successfulRequests, details: results };
    }
};