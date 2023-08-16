const BadRequestError = require('../errors/bad_request');
const UnauthenticatedError = require('../errors/unauthenticated_error');
const NotFoundError = require('../errors/not_found');
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if(err instanceof UnauthenticatedError) {
    return res.status(err.statusCode).json({msg:err.message});
  }

  if(err instanceof NotFoundError) {
    return res.status(err.statusCode).json({msg:err.message});
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
