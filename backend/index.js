const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

_URL = 'https://script.google.com/macros/s/AKfycbzGKhp0qWQkSkv3HhcBACliQym8SCF4tPwTZpEWWYR7ctSeDcOoUmGG9ZKKmSe6CJa0/exec';

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'POST failed' });
  }
});

app.get('/last', async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'GET failed' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy listening on port ${PORT}`);
});
