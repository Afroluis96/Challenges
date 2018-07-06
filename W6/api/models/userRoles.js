const { mongoose } = require('../bd/index');

const { Schema } = mongoose;

const userRoleSchema = new Schema({
    roleName: String,
});

module.exports = mongoose.model('userRoles',userRoleSchema);