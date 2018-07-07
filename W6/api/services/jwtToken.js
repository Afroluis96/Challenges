let jwt = require('jsonwebtoken');

const { superSecret } = process.env;


const getToken = (user) =>{
    const payload = {
        id: user._id 
      };
      console.log(payload);

      return token = jwt.sign(payload, superSecret, {
        expiresIn: 28800 // expires in 12 hours
      });
}

module.exports = {
    getToken
}