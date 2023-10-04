const axios = require('axios');
require('dotenv').config();

exports.fetchFloodWarningData = async () => {
    const response = await axios.get(process.env.FLOOD_API_URL);

    return response.data;
};

exports.updateFloodDataInService = async (data, url) => {
    const response = await axios.post(url, data);
    return response.status;
};
