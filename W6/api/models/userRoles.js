const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
    roleName: String
})

module.exports = mongoose.model('userRoles',userRoleSchema);