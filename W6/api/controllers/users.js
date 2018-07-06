require('dotenv').config('../.env');

const userModel = require('../models/users');

const roleHelper = require('../helpers/role');

let jwt = require('jsonwebtoken');

const { suprSecret } = process.env;

const login = (req, res) => {
    if(!req.body) res.status(400).send({message: 'NO body found'});
     userModel.findOne({
         userName: req.body.name
     })
     .then(user =>{
       if(!user) return Promise.reject(new Error('Error trying to finde user'));
       if(req.body.password !== user.password) return Promise.reject(new Error('Passwords do not match'));

       const payload = {
         role: user.userRoleId 
       };

       return token = jwt.sign(payload, suprSecret, {
         expiresIn: 28800 // expires in 12 hours
       });

     })
     .then(token =>{
         res.send({
             success: true,
            message: 'Enjoy your token!',
            token: token});
     })
     .catch((err) => {
        res.status(err.code || 500);
        res.send(err.message);
      });
    
}

const signUp = (req, res) => {
    
  const { user, password } = req.body;
  console.log('user: ',user);
  roleHelper.getRoleByName('Client')
  .then(role =>{
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