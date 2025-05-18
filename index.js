const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Глобально дозволяємо CORS для всіх маршрутів
app.use(cors());

// Додатково дозволяємо preflight-запити для всіх маршрутів
app.options('*', cors());

// Основний маршрут
app.get('/a1', async (req, res) => {
  console.log("🔥 Отримано GET-запит від Netlify");

  const GAS_URL = 'https://script.google.com/macros/s/AKfycbxZoGmQ_gVkiA0I7wkPg75tp1Ya_7KCVynIHDHJXEqD3QhXwNi0EwsECGh8AmZ23gfS/exec';

  try {
    const response = await fetch(GAS_URL);
    const text = await response.text();

    res.send(text); // CORS вже обробляє app.use(cors())
  } catch (error) {
    console.error('❌ Помилка при fetch:', error);
    res.status(500).json({ error: 'Помилка проксі: ' + error.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Render-проксі запущено на порту ${PORT}`);
});
