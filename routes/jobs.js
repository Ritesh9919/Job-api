const express = require('express');
const router = express.Router();
const jobApi = require('../controllers/jobs');
const authenticateUser = require('../middleware/auth');



router.get('/jobs', authenticateUser, jobApi.getAllJobs);
router.get('/job/:id', authenticateUser,jobApi.getJob);
router.post('/job', authenticateUser, jobApi.createJob);
router.patch('/job/:id', authenticateUser, jobApi.updateJob);
router.delete('/job/:id', authenticateUser, jobApi.deleteJob);



module.exports = router;