const { fetchFloodWarningData, updateFloodDataInService } = require('../models/dataService');
require('dotenv').config();

let FWS_INFO_SERVICE_URL = process.env.FWS_INFO_SERVICE_URL;

// Check if the URL ends with a slash and remove it
if (FWS_INFO_SERVICE_URL.endsWith('/')) {
    FWS_INFO_SERVICE_URL = FWS_INFO_SERVICE_URL.slice(0, -1);
}

FWS_INFO_SERVICE_URL += '/update-flood-data'

exports.handleData = async () => {
    try {
        const data = await fetchFloodWarningData();
        const statusCode = await updateFloodDataInService(FWS_INFO_SERVICE_URL,data);

        if (statusCode === 200) {
            console.log("Flood data successfully updated in fws-info-service.");
        } else {
            console.error("Failed to update flood data in fws-info-service. Response code:", statusCode);
        }

    } catch (error) {
        console.error("Error fetching or updating flood warning data:", error.message);
    }
};

// Run the function immediately upon invocation
exports.handleData();
