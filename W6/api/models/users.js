const { mongoose } = require('../bd/index');

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String,
  password: String,
  userRoleId: { type: Schema.Types.ObjectId, ref: 'userRoles' }
},{
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('users', userSchema);
