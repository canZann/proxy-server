const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

app.get('/price', async (req, res) => {
    const { name } = req.query;
    try {
        const response = await axios.get(`https://pricempire.com/search?q=${encodeURIComponent(name)}`);
        res.send(response.data);
    } catch (err) {
        res.status(500).send({ error: err.toString() });
    }
});

app.listen(3000, () => console.log('Proxy server started on port 3000'));
