const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/price', async (req, res) => {
    const { name } = req.query;
    try {
        const response = await axios.get('https://api.skinport.com/v1/items?app_id=730');
        const allItems = response.data;

        const item = allItems.find(item => item.market_hash_name.toLowerCase() === name.toLowerCase());

        if (item) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.send({ price: item.min_price });
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.status(200).send({ price: null }); // ürün bulunamazsa boş fiyat dön
        }
    } catch (err) {
        console.error("Proxy server error:", err.message);
        res.status(500).send({ error: err.toString() });
    }
});

app.listen(3000, () => console.log('Proxy server started on port 3000'));
