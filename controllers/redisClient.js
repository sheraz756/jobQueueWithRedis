// controllers/redisClient.js

const redis = require('redis');
const jobWorker = require('../worker/jobWorker');
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

client.on('connect', () => {
  console.log('Connected to Redis server');
  jobWorker.processJob();
});

client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

module.exports = client;
