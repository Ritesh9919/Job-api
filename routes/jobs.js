const express = require('express');
const router = express.Router();
const jobApi = require('../controllers/jobs');


router.get('/jobs', jobApi.getAllJobs);
router.get('/job/:id', jobApi.getJob);
router.get('/job', jobApi.createJob);
router.get('/job/:id', jobApi.updateJob);
router.get('/job/:id', jobApi.deleteJob);



module.exports = router;