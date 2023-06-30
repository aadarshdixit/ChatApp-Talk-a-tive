const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const generatetoken = (id)=>{
      return jwt.sign({id},process.env.JSONWEBSECRET,{
        expiresIn:"30d",
     });
}
module.exports = generatetoken;