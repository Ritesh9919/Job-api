const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('../errors/unauthenticated_error');
const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');


const auth = async (req, res, next) => {
const authHeader = req.headers.authorization;
if(!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError(StatusCodes.UNAUTHORIZED, 'authentication Invalid');
}

const token = authHeader.split(' ')[1];
try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {userId:payload.userId, name:payload.name};
    next();
} catch (error) {
    throw new UnauthenticatedError(StatusCodes.UNAUTHORIZED, 'authentication invalid');
}
}


module.exports = auth;