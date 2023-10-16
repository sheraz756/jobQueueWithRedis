const express = require('express');
const router = express.Router();
const redis = require('../utils/redis');

// Job creation route
router.post('/', async (req, res) => {
  const jobData = req.body;

  const jobId = Math.random().toString(36).substr(2, 9); 

  const jobInfo = { id: jobId, data: JSON.stringify(jobData) };
  await redis.lpush('jobQueue', JSON.stringify(jobInfo));

  res.json({ message: 'Job created', jobId });
});



// Job status route
router.get('/:id', async (req, res) => {
  const jobId = req.params.id;
  const jobStatus = await redis.hget('jobStatus', jobId);

  if (jobStatus) {
    const jobData = await redis.hget('jobResult', jobId);

    try {
      res.json({ id: jobId, status: jobStatus, result: jobData   });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error parsing job data' });
    }
  } else {
    res.status(404).json({ error: 'Job not found' });
  }
});



module.exports = router;
