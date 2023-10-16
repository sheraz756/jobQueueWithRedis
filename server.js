const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config({path:'./.env'});
app.use(express.json());

const job= require('./routes/job');
const {processJobs} = require('./worker/jobWorker');
// Start the job processing worker
processJobs();

app.use('/jobs', job);
app.use('/jobs/:id', job);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
