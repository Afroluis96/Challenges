const roleModule = require('../models/userRoles');

const getRoleByName = (roleName) => {
   console.log('rolename: ',roleName) 
   return roleModule.findOne({ roleName });
}

module.exports = {
    getRoleByName
}