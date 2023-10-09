const express = require('express');
const cors = require('cors');
const dataHandler = require('../controller/dataController');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3003;


app.use(express.json());

app.use(cors());

app.get('/trigger', async (req, res) => {
    try {
        await dataHandler.handleData();
        res.send('handleData function invoked successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error invoking handleData function.');
    }
});

// Run the function immediately upon server startup
dataHandler.handleData();

setInterval(dataHandler.handleData, 15 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`fws-data-poller running on port ${PORT}`);
});