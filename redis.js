const redis = require('redis');

const redisClient = redis.createClient({
  host:  '127.0.0.1',//'redis-FBB4System-az-asse-dev-001.redis.cache.windows.net', // or your Redis server host
  port: 6379
});

// Event handlers
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

