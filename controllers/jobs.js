const User = require('../models/user');
const Job = require('../models/job');
const {StatusCodes} = require('http-status-codes');

module.exports.getAllJobs = (req, res) => {
    return res.send('Get all Jbos');
}


module.exports.getJob = (req, res) => {
    return res.send('get job');
}


module.exports.createJob = async (req, res) => {

//     const {company, position} = req.body;
//     if(req.user) {
//     const job = await Job.create({
//         company:company,
//         position:position,
//         createdBy:req.user.userId
//     });
// }

//      return res.status(StatusCodes.CREATED, {job});
    req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
    
    
}


module.exports.updateJob = (req, res) => {
    return res.send('update job');
}

module.exports.deleteJob = (req, res) => {
    return res.send('delete job');
}