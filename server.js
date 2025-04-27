const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

// Steam Market üzerinden fiyat çekme
app.get('/price', async (req, res) => {
    const { name } = req.query;
    try {
        const response = await axios.get(`https://steamcommunity.com/market/priceoverview/?currency=3&appid=730&market_hash_name=${encodeURIComponent(name)}`);

        if (response.data && response.data.success) {
            const lowestPrice = response.data.lowest_price || null; // en düşük satış fiyatı
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send({ price: lowestPrice });
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send({ price: null }); // ürün bulunamadı
        }

    } catch (err) {
        console.error("Proxy server error:", err.message);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ price: null }); // hata olursa da boş dön
    }
});

app.listen(3000, () => console.log('Proxy server started on port 3000'));
