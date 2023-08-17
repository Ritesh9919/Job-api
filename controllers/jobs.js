const User = require('../models/user');
const Job = require('../models/job');
const { StatusCodes } = require('http-status-codes');
const NotFoundError = require('../errors/not_found');

module.exports.getAllJobs = async (req, res) => {
    const job = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    return res.status(StatusCodes.OK).json({ job, count: job.length });
}


module.exports.getJob = async (req, res) => {
    const userId = req.user.userId;
    const jobId = req.params.id;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new NotFoundError(`no job with this ${jobId}`);
    }

    return res.status(StatusCodes.OK).json({ job });
}


module.exports.createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })


}


module.exports.updateJob = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.userId;
    const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true });
    if (!job) {
        throw new NotFoundError(`no job with this id:${jobId}`);
    }
    return res.status(StatusCodes.OK).json({ job });
}

module.exports.deleteJob = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.userId;
    const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new NotFoundError('no job with this id');
    }

    return res.status(StatusCodes.OK).json({ msg: 'deleted' });
}