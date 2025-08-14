const express = require('express');
const checkDuplicateTransaction = require('../checkDuplicateTransaction');

const app = express();
app.use(express.json());

// Example routes
app.post('/api/x-transaction-redis', checkDuplicateTransaction, (req, res) => {
  res.json({ success: true, message: 'Transaction accepted' });
});

app.post('/api/bypass', (req, res) => {
  res.json({ success: true, message: 'Bypass route' });
});

// Listen on 0.0.0.0 so container ports are accessible
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
