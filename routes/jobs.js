const express = require('express');
const router = express.Router();
const jobApi = require('../controllers/jobs');
const authenticateUser = require('../middleware/auth');



// router.get('/jobs', jobApi.getAllJobs);
// router.get('/job/:id', jobApi.getJob);
router.post('/job', authenticateUser, jobApi.createJob);
// router.get('/job/:id', jobApi.updateJob);
// router.get('/job/:id', jobApi.deleteJob);



module.exports = router;