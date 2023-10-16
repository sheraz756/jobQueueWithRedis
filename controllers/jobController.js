// controllers/jobController.js

const redisClient = require('./redisClient');

function createJob(jobData) {
  // Enqueue the job in Redis
  redisClient.rPush('myJobQueue', JSON.stringify(jobData));
}

module.exports = {
  createJob,
};
