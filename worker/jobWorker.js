const redis = require('../utils/redis');

async function processJobs() {
  while (true) {
    const job = await redis.rpop('jobQueue');
    if (job) {
      const { id, data } = JSON.parse(job);
      console.log(id,data)
      const result = `Processed job with : ${data}`;
      await redis.hset('jobStatus', id, 'completed');
      await redis.hset('jobResult', id, data);
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

module.exports = { processJobs };
