const User = require('../models/user');

const BadRequestError = require('../errors/bad_request');
const UnauthenticatedError = require('../errors/unauthenticated_error');
const {StatusCodes} = require('http-status-codes');


module.exports.register = async (req, res) => {
    
   const user = await User.create(req.body); 
   const token = user.createJWT();
return res.status(StatusCodes.CREATED).json({
        user:{
            name:user.name
        },
        token:token
    })

}




module.exports.login = async(req, res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        throw new BadRequestError(StatusCodes.BAD_REQUEST, 'please provide email and password');
    }

    const user = await User.findOne({email:email});
    if(!user) {
        throw new UnauthenticatedError(StatusCodes.UNAUTHORIZED, 'Invalid Credentials');
    }

   const isPasswordCurrect = await user.comparePassword(password);
   if(!isPasswordCurrect) {
    throw new UnauthenticatedError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
   }
   
    const token = user.createJWT();
    return res.json({
        user:{
            name:user.name,
            token:token
        }
    })
}