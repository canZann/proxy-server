const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

app.get('/price', async (req, res) => {
    const { name } = req.query;
    try {
        // Skinport API'den tüm ürünleri çekiyoruz
        const response = await axios.get('https://api.skinport.com/v1/items?app_id=730');
        const allItems = response.data;

        // Gelen item'lar içinde adı eşleşeni buluyoruz
        const item = allItems.find(item => item.market_hash_name.toLowerCase() === name.toLowerCase());

        if (item) {
            res.send({ price: item.min_price });
        } else {
            res.status(404).send({ error: "Ürün bulunamadı" });
        }
    } catch (err) {
        res.status(500).send({ error: err.toString() });
    }
});

app.listen(3000, () => console.log('Proxy server started on port 3000'));
