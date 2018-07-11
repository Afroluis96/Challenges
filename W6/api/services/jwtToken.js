const jwt = require('jsonwebtoken');

const roleHelper = require('../helpers/role');

const { superSecret, expirationTokenTime } = process.env; //28800


const getToken = (user) =>{
    const payload = {
        id: user._id,
        role: user.userRoleId.roleName
      };
      return token = jwt.sign(payload, superSecret, {
        expiresIn: Number(expirationTokenTime)
      });
}

module.exports = {
    getToken
}