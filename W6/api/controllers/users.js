const userModel = require('../models/users');
const roleHelper = require('../helpers/role');

const login = (req, res) => {
    
    
}

const signUp = (req, res) => {
    
  const { user, password } = req.body;

  roleHelper.getRoleByName('Client')
  .then(role =>{
    //console.log(role._id);
    return newUser = new userModel({
        userName: user,
        password,
        userRoleId: role._id
    });
  }).then(user =>{
      console.log("at leaste get here");
      user.save();
  }).catch(err => {
      res.status(500).send({message:`Error when creating user ${err}`});
  })
  

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