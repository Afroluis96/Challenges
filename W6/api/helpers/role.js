const roleModule = require('../models/userRoles');

const getRoleByName = (roleName) => {
 
   return roleModule.findOne({ roleName });
}

module.exports = {
    getRoleByName
}