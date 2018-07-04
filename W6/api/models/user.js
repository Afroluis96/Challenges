const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
  userName: String,
  password: String,
  userRoleId: [{ type: Schema.Types.ObjectId, ref: 'userRoles' }],
});

module.exports = mongoose.model('users', userSchema);
