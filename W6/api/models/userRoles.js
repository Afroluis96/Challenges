const { mongoose } = require('../bd/index');

const { Schema } = mongoose;

const roleSchema = new Schema({
  roleName: String,
  description: String
});

module.exports = mongoose.model('userRoles', roleSchema);
