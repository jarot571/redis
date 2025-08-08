// app.js
const express = require('express');
const app = express();
const redisClient = require('./redis');

app.use(express.json());


const genErrorResponseObj = (req, code, message) => ({
  error_code: code,
  message: message,
  request_id: req.get('x-request-id') || 'N/A',
});

const responseError = (res, errorObj) => {
  const statusCode = errorObj.error_code.startsWith('4') ? 400 : 500;
  res.status(statusCode).json(errorObj);
};

const checkDuplicateTransaction = async (req, res, next) => {
  const transactionId = req.get('x-transaction-id');

  if (transactionId) {
    try {
      const isDuplicate = await redisClient.get(transactionId);
      if (isDuplicate) {
        console.warn(`Duplicate transaction detected for ID: ${transactionId}`);
        return responseError(res, genErrorResponseObj(req, '40002', 'Duplicate transaction ID'));
      }
      await redisClient.set(transactionId, 'true', 'EX', 60);
    } catch (e) {
      console.error('Redis error in checkDuplicateTransaction:', e);
      return responseError(res, genErrorResponseObj(req, '50000', 'Internal server error with Redis'));
    }
  }

  next();
};

app.use(checkDuplicateTransaction);


app.post('/api/x-transaction-redis', async (req, res) => {
  try {
    const payload = req.body;
    res.json({ status: '00 Success', payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '99 Failed ' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});