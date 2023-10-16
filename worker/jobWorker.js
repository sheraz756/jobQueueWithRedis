const redis = require('../utils/redis');

async function processJobs() {
  while (true) {
    const job = await redis.rpop('jobQueue');
    if (job) {
      const { id, data } = JSON.parse(job);
      console.log(id,data)
      // Simulate job processing (replace with your actual job processing logic)
      const result = `Processed job with : ${data}`;
      await redis.hset('jobStatus', id, 'completed');
      await redis.hset('jobResult', id, data);
    } else {
      // Sleep to avoid high CPU usage when the queue is empty
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

module.exports = { processJobs };
