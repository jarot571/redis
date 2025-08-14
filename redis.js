const redis = require('redis');

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  }
});

redisClient.on('connect', () => console.log(`Connected to Redis at ${REDIS_HOST}:${REDIS_PORT}`));
redisClient.on('ready', () => console.log('Redis client is ready'));
redisClient.on('error', (err) => console.error('Redis connection error:', err));

(async () => {
  try {
    await redisClient.connect();
    console.log('Successfully connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    process.exit(1);
  }
})();

module.exports = redisClient;
