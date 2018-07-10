const { mongoose } = require('../bd/index');

const { Schema } = mongoose;

const roleSchema = new Schema({
  roleName: String,
  description: String
},{
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('userRoles', roleSchema);
