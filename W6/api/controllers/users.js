require('dotenv').config('../.env');

const UserModel = require('../models/users');

const roleHelper = require('../helpers/role');

const servicesToken = require('../services/jwtToken');

const { clientList } = require('../services/whiteList');


const login = (req, res) => {
  if (!req.body) res.status(400).send({ message: 'NO body found' });
  UserModel.findOne({
    userName: req.body.name,
  }).populate('userRoleId')
    .then((user) => {
      if (!user) return Promise.reject(new Error('Error trying to finde user'));
      if (req.body.password !== user.password) return Promise.reject(new Error('Passwords do not match'));
      return servicesToken.getToken(user);
    })
    .then((token) => {
      clientList.sadd(['activeUsers', token], function(err, reply){
        console.log(reply);
      })
      res.send({
        token,
      });
    })
    .catch((err) => {
      res.status(err.code || 500);
      res.send(err.message);
    });
};

const addUser = (req, res) => {
  if (!req.body) res.status(400).send({ message: 'NO body found' });
  const { user, password, role } = req.body;
  
  UserModel.findOne({ userName: user })
    .then((userOne) => {
      if (userOne) return Promise.reject(new Error('Username already exists'));
      return roleHelper.getRoleByName(role);
    })
    .then((roleFound) => {
      if (!roleFound) return Promise.reject(new Error('Couldnt find the userRole'));

      return newUser = new UserModel({
        userName: user,
        password,
        userRoleId: roleFound._id,
      }).save();
    })
    .then((saved) => {
      res.send(saved);
    })
    .catch(err => {
      res.status(500).send({ message: `Error when creating user ${err.message}` });
    });
};

const logout = (req, res) => {
  res.send('Entro');
};

module.exports = {
  login,
  addUser,
  logout,
};
