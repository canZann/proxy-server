const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

// İsimleri temizleyen fonksiyon
function temizle(text) {
    return text
        .replace(/★/g, '') // Yıldız sembolünü sil
        .replace(/™/g, '') // TM işaretini sil
        .replace(/[^\w\s\|\-\(\)]/g, '') // Özel karakterleri temizle
        .toLowerCase()
        .trim();
}

app.get('/price', async (req, res) => {
    const { name } = req.query;
    try {
        const response = await axios.get('https://api.skinport.com/v1/items?app_id=730');
        const allItems = response.data;

        const cleanedQueryName = temizle(name);

        const item = allItems.find(i => {
            const cleanedItemName = temizle(i.market_hash_name);
            return cleanedItemName.includes(cleanedQueryName);
        });

        res.setHeader('Access-Control-Allow-Origin', '*');

        if (item && item.min_price) {
            res.status(200).send({ price: item.min_price });
        } else {
            res.status(200).send({ price: null });
        }

    } catch (err) {
        console.error("Proxy server error:", err.message);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({ price: null });
    }
});

app.listen(3000, () => console.log('Proxy server started on port 3000'));
