const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'OPTIONS']
}));

// Preflight (важливо для Netlify)
app.options('/a1', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', '*');
  res.status(204).send('');
});

// Основний GET
app.get('/a1', async (req, res) => {
  console.log("🔥 Отримано GET-запит від Netlify");
  try {
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbxZoGmQ_gVkiA0I7wkPg75tp1Ya_7KCVynIHDHJXEqD3QhXwNi0EwsECGh8AmZ23gfS/exec';
    const response = await fetch(GAS_URL);
    const text = await response.text();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(text);
  } catch (error) {
    console.error('❌ Помилка при fetch:', error);
    res.status(500).send('Помилка проксі: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Render-проксі запущено на порту ${PORT}`);
});
