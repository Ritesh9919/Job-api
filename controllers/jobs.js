const User = require('../models/user');

module.exports.getAllJobs = (req, res) => {
    return res.send('Get all Jbos');
}


module.exports.getJob = (req, res) => {
    return res.send('get job');
}


module.exports.createJob = (req, res) => {
    return res.send('create job');
}


module.exports.updateJob = (req, res) => {
    return res.send('update job');
}

module.exports.deleteJob = (req, res) => {
    return res.send('delete job');
}