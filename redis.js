const redis = require('redis');

// Use environment variables with defaults
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  }
});

// Connection events
redisClient.on('connect', () => {
  console.log(`Connected to Redis at ${REDIS_HOST}:${REDIS_PORT}`);
});

redisClient.on('ready', () => {
  console.log('Redis client is ready to use');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Connect with async/await in main app to handle errors gracefully
(async () => {
  try {
    await redisClient.connect();
    console.log('Successfully connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    process.exit(1); // Fail fast if Redis is not reachable
  }
})();

module.exports = redisClient;
