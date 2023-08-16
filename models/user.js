const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'please provide name'],
    minLength:3,
    maxLength:50
  },

  email:{
    type:String,
    required:[true, 'please provide email'],
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide valid email'],
    unique:true
  },


  password:{
    type:String,
    required:true,
    minLength:6,
    
  }
});

userSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
});

userSchema.methods.createJWT = function() {
  return jwt.sign({userId:this._id, name:this.name}, process.env.SECRET_KEY, {expiresIn:process.env.JWT_LIFETIME});
}

userSchema.methods.comparePassword = async function (condidatePassword) {
  const isMatch = await bcrypt.compare(condidatePassword, this.password);
  return isMatch;
}


const User = mongoose.model('User', userSchema);
module.exports = User;