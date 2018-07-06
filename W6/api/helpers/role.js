const roleModule = require('../models/userRoles');

const getRoleByName = (roleName) => new Promise((resolve, reject) =>{
  console.log(roleName);
 /*  roleModule.findOne({ roleName: 'Client' }, function(err, role){
    if(err) return reject(err);
    console.log("role: ",role);
    return resolve(role);
 */
  const role = roleModule.findOne({ roleName });
  console.log(role);
  return role;
  //});
});
    
module.exports = {
    getRoleByName
}