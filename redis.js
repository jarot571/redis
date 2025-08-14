const redis = require('redis');

// Create client using URL format (preferred in v4)
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`
});

// Handle connection events
redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis server');
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Successfully connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

module.exports = redisClient;
