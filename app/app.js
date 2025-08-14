// app.js
const express = require('express');
const app = express();
const checkDuplicateTransaction = require('../checkDuplicateTransaction');

app.use(express.json());

app.post('/api/x-transaction-redis', checkDuplicateTransaction, async (req, res) => {
  try {
    const payload = req.body;
    res.json({ status: '00 Success', payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '99 Failed ' });
  }
});


app.post('/api/bypass', async (req, res) => {
  try {
    const payload = req.body;
    res.json({ status: '00 Bypass Success', payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '99 Bypass Failed ' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});