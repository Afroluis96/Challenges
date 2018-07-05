const userModel = require('../models/users');
const userRoleModel = require('../models/userRoles');

const login = (req, res) => {
    
    
}

const signUp = (req, res) => {
    
  const { user, password } = req.body;

  const newUser = new userModel({
    userName: user,
    password,

  })
  res.send(user + password);

}

const logout = (req, res) => {
    res.send("Entro");
    console.log("Entro a la ruta ");
}

module.exports = {
    login,
    signUp,
    logout
}