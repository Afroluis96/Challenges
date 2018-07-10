const roleModule = require('../models/userRoles');

const getRoleByName = (roleName) => {
   console.log('rolename: ',roleName) 
   return roleModule.findOne({ roleName });
}

const getRoleById = (id) => {
    console.log('rolename: ',id) 
    return roleModule.findById({ id});
 }
 

module.exports = {
    getRoleByName,
    getRoleById
}