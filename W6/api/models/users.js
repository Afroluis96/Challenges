const { mongoose } = require('../bd/index');

const { Schema } = mongoose;

const userSchema = Schema({
  userName: String,
  password: String,
  userRoleId: [{ type: Schema.Types.ObjectId, ref: 'userRoles' }],
});

module.exports = mongoose.model('users', userSchema);
