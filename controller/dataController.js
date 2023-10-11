const { fetchFloodWarningData, updateFloodDataInService } = require('../models/dataService');
require('dotenv').config();

let FWS_INFO_SERVICE_URL = process.env.FWS_INFO_SERVICE_URL;

// Check if the URL ends with a slash and remove it
if (FWS_INFO_SERVICE_URL.endsWith('/')) {
    FWS_INFO_SERVICE_URL = FWS_INFO_SERVICE_URL.slice(0, -1);
}

FWS_INFO_SERVICE_URL += '/update-flood-data'

console.log('FWS_INFO_SERVICE_URL:', FWS_INFO_SERVICE_URL);

exports.handleData = async () => {
    try {
        const data = await fetchFloodWarningData();
        const response = await updateFloodDataInService(FWS_INFO_SERVICE_URL, data, 50);  // Use FWS_INFO_SERVICE_URL here

        if (response.status === 'success' || response.status === 'partial_success') {
            console.log("Flood data successfully updated in fws-info-service.");
        } else {
            console.error("Failed to update flood data in fws-info-service.");
        }

    } catch (error) {
        console.error("Error fetching or updating flood warning data:", error.message);
    }
};