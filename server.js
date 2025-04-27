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

        const lowerName = name.toLowerCase();

        // Kısmi eşleşme yapıyoruz (includes)
        const item = allItems.find(item =>
            item.market_hash_name.toLowerCase().includes(lowerName)
        );

        res.setHeader('Access-Control-Allow-Origin', '*');

        if (item && item.min_price) {
            res.status(200).send({ price: item.min_price });
        } else {
            res.status(200).send({ price: null }); // Ürün bulunamadıysa boş dönüyoruz
        }

    } catch (err) {
        console.error("Proxy server error:", err.message);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ price: null }); // Hata olsa bile boş veri dön
    }
});

app.listen(3000, () => console.log('Proxy server started on port 3000'));
