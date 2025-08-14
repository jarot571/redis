const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1', //
    port: process.env.REDIS_PORT || 6379,
  }
});

// Handle connection events
redisClient.on('connect', () => {
  console.log('Connected to Redis server');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redisClient.connect()
  .then(() => {
    console.log('Successfully connected to Redis');
  })
  .catch((err) => {
    console.error('Failed to connect to Redis:', err);
  });


  
module.exports = redisClient;