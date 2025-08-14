const redisClient = require('./redis'); // Make sure this exports the client
const { promisify } = require('util');

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

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
      const isDuplicate = await getAsync(transactionId);
      if (isDuplicate) {
        console.warn(`Duplicate transaction detected for ID: ${transactionId}`);
        return responseError(res, genErrorResponseObj(req, '40002', 'Duplicate transaction ID'));
      }
      await setAsync(transactionId, 'true', 'EX', 60); // expires in 60 seconds
    } catch (e) {
      console.error('Redis error in checkDuplicateTransaction:', e);
      return responseError(res, genErrorResponseObj(req, '50000', 'Internal server error with Redis'));
    }
  }

  next();
};

module.exports = checkDuplicateTransaction;
